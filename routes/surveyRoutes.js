const Path = require('path-parser').default;
const { URL } = require ('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thank you for voting.');
    });

    //req is the incoming array of events from webhook
    //first extract the path from URL, then get survey ID and choice
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        const events = req.body.map(({url, email}) => {
            const match = p.test(new URL(url).pathname);
            //if URL has no surveyId or no choice, match is null
            if(match){
                return {
                    email,
                    surveyId: match.surveyId,
                    choice: match.choice
                };
            }
        });

        //clear out any undefined events 
        const compactEvents = events.filter(event => event !== false);

        //clear out any duplicate events
        const uniqueEvents = compactEvents.reduce((acc, current) => {
            const x = acc.find(item => (item.surveyId === current.surveyId && item.email === current.email));
            if(!x){
                return acc.concat([current]);
            }
            else{
                return acc;
            }
        }, []);

        //go through uniqueEvents and update mongoDB
        uniqueEvents.forEach( ({surveyId, email, choice}) => {
            Survey.updateOne({
               _id: surveyId,
               recipients: {
                   $elemMatch: {email: email, responded: false}
               } 
            }, {
                $inc: { [choice]: 1},
                $set: {'recipients.$.responded': true},
                lastResponded: new Date()
            }).exec();
        });

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        //User model is inside req.user, req.body has info you need

        //makes new instance of a Survey, still has not been persisted to mongoDB
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title, 
            subject,
            body,
            recipients: recipients.split(',').map(email => {
                return { email: email.trim() };
            }),
            _user: req.user.id,
            dateSent: Date.now()
        });

        //after survey created, send email, 2nd arg is email template
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            //async functions
            await mailer.send();
            await survey.save();

            //deduct credit from User then save
            req.user.credits -= 1;
            const user = await req.user.save();

            //send back updated user model to indicate change in credits
            res.send(user);
        } catch(err){
            //unprocessable entity
            res.status(422).send(err);
        }

    });
};
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thank you for voting.');
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
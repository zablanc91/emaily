const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const  keys = require('../config/keys');

class Mailer extends helper.Mail {
    //first arg: fields from survey, 2nd arg: content/body of email
    constructor( {subject, recipients}, content) {
        super();

        //sendgrid setup, use helper functions to format email info to work properly
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        //register body with the Mailer, this is built in function from Mail
        this.addContent(this.body);

        //Sendgrid replacing email links with their own
        this.addClickTracking();

        //process list of recipients, add to Mailer
        this.addRecipients();
    }

    //for Recipients subdoc, need array of objects where key is email
    formatAddresses(recipients){
        return recipients.map(recipient => {
            const { email } = recipient;
            return new helper.Email(email);
        });
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings;
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients(){
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);

        });
        //another built in function from Mail base class
        this.addPersonalization(personalize);
    }

    //take Mailer, convert to JSON, and send to Sendgrid; email the recipients
    async send(){
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        //send to Sendgrid
        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;
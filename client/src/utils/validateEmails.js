//first turn list of comma separated emails and get an array of emails
//then validate each email with regex (re.test being true = valid email)

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    const invalidEmails = emails
        .split(',').
        map(email => email.trim())
        .filter(email => re.test(email) === false);
    
        if(invalidEmails.length){
            return `These emails are invalid: ${invalidEmails}`;
        }

        return;
};
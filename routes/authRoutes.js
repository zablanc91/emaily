const passport = require('passport');

//need export to index since we don't have access to app
module.exports = (app) => {
    //route handler to start the passport flow
    //passport knows to use GoogleStrategy if it is authenticated with string 'google' (the identifier for our GoogleStrategy)
    //second arg of authenticate specifies what kind of access 
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    //route handler when user visits /auth/google/callback, will send in code for user profile info
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google')
    );
};


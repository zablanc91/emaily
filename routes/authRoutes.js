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

    //when user logs out, take the cookie and get rid of the user id
    //also send response, without one the browser will not terminate the session
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    //route handler when someone makes a GET request to our app
    //req = incoming request, res = outgoing response; simply send the user for the res
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};


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

    //route handler when user visits /auth/google/callback after OAuth flow, will send in code for user profile info
    //third arg - pass to next handler and go to surveys route
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    //when user logs out, take the cookie and get rid of the user id
    //also send response, without one the browser will not terminate the session
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    //route handler when someone makes a GET request to our app
    //req = incoming request, res = outgoing response; simply send the user for the res
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};


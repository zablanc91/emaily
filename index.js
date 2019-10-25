//common JS modules, no ES2015 modules for Express?
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

//tell passport how to use our Strategy, pass in new instance of GoogleStrategy
//3rd key of GoogleStrategy's first object argument  - url where user is sent after being granted permissions
//second argument to GoogleStrategy - arrow funct as callback, details about user are received so now is good opportunity to store info in databse on server
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access token: ', accessToken);
        console.log('profile: ', profile);
        console.log('refresh token: ', refreshToken);
    })
);

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

/*
//this was initially test code, here for reference
//at root route, run the arrow funct, response sent back is an object to display
app.get('/', (req, res) => {
    res.send({
        hi: 'there',
        hello: 'how low?'
    });
});

*/

//dynamic port binding for Heroku (will receive at runtime) , otherwise use 5000 for local
const PORT = process.env.PORT || 5000;
app.listen(PORT);
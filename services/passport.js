const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//tell passport how to use our Strategy, pass in new instance of GoogleStrategy
//3rd key of GoogleStrategy's first object argument  - url where user is sent after being granted permissions
//second argument to GoogleStrategy - arrow funct as callback, details about user are received so now is good opportunity to store info in database on server
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access token: ', accessToken);
        console.log('refresh token: ', refreshToken);
        console.log('profile: ', profile);
    })
);
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

//one argument to mongoose.model, so fetch
//this is our Model Class/Collection
const User = mongoose.model('users');

//tell passport how to use our Strategy, pass in new instance of GoogleStrategy
//3rd key of GoogleStrategy's first object argument  - url where user is sent after being granted permissions
//second argument to GoogleStrategy - arrow funct as callback, details about user are received so now is good opportunity to store info in database on server
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        //check to see if the user is already in the DB, this is an async function and returns a promise
        User.findOne({ googleId: profile.id })
          .then((existingUser) => {
              if(existingUser){
                  //already have a record with profile id
              }
              else{
                 //don't have this user, make a new record
                 new User({googleId: profile.id}).save(); 
              }
          });

        /* previously just logged info to terminal
        console.log('access token: ', accessToken);
        console.log('refresh token: ', refreshToken);
        console.log('profile: ', profile);
        */
    })
);
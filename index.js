//common JS modules, no ES2015 modules for Express?
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

//require so that the configuration for the code in these files is loaded
require('./models/User');
require('./models/Survey');
require('./services/passport');

//connect, also add obj parameter to get rid of warnings
mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.log('Error on start: ' + err.stack));

const app = express();

//make body-parser available for POST/PUT/PATCH requests
app.use(bodyParser.json());

//in cookie session: lasts 30 days (in milliseconds), second arg is a key (inside our keys.js) to encrypt our cookie
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//tell Passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

//needed so routes files can have access to app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);


//make sure Express behaves correctly in prod mode
if(process.env.NODE_ENV === 'production'){
    //Express will serve up prod assets ie main.js
    app.use(express.static('client/build'));

    //Express will serve up the index.html file if route not recognized
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

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
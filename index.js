//common JS modules, no ES2015 modules for Express?
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
//require so that the configuration for the code in these files is loaded
require('./models/User');
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

//needed so authRoutes can have access to app
require('./routes/authRoutes')(app);

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
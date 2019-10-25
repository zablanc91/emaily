//common JS modules, no ES2015 modules for Express?
const express = require('express');

//needed for code execution inside passport.js
require('./services/passport');

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
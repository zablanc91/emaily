//common JS modules, no ES2015 modules for Express?
const express = require('express');

const app = express();

//at root route, run the arrow funct, response sent back is an object to display
app.get('/', (req, res) => {
    res.send({
        hi: 'there',
        hello: 'how low?'
    });
});

//dynamic port binding for Heroku (will receive at runtime) , otherwise use 5000 for local
const PORT = process.env.PORT || 5000;
app.listen(PORT);
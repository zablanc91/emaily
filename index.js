//common JS modules, no ES2015 modules for Express?
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

//dynamic port binding for Heroku (will receive at runtime) , otherwise use 5000 for local
const PORT = process.env.PORT || 5000;
app.listen(PORT);
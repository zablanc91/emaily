//need to ensure a User is logged in
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        //TODO: make sure the User has enough credits, User model is inside req.user, req.body has info you need
        console.log(req.body);
        
    });
};
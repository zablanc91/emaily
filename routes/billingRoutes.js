const keys = require('../config/keys');

//needs secret key
const stripe = require('stripe')(keys.stripeSecretKey);

//for billing, 2nd arg is response handler that needs to handle token and reach out to Stripe API to finalize charge
module.exports = app => {
    app.post('/api/stripe', async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 emaily credits',
            source: req.body.id
        });
        
        //need to get current User and give them 5 credits, also need to save (which is async)
        req.user.credits += 5;
        const user = await req.user.save();
        
        res.send(user);
    });
};
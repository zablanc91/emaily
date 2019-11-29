//next is a function we call when we're done, we may have another middleware in the chain (only if not terminating the request)
module.exports = (req, res, next) => {
    if(!req.user){
        return res.status(401).send({error: 'You must log in.'});
    }
    next();
};
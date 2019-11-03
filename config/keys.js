//keys.js - figure out what set of credentials to return, determine if in prod or dev

if(process.env.NODE_ENV === 'production'){
    //in prod, return prod keys
    module.exports = require('./prod');
}
else{
    //return dev keys
    module.exports = require('./dev');
}
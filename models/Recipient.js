const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    responded: {type: Boolean, default: false}
});

//export schema because it's a SubDoc of Survey
module.exports = recipientSchema;
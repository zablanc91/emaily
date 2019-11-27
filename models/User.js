const mongoose = require('mongoose');
//mongoose wants to know different properties of our records, use Schema to define that
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 0}
});

//Create the collection. First arg: name of collection, second is the Schema
//two arguments to mongoose.model, so load into mongoose
mongoose.model('users', userSchema);
const  mongoose = require('mongoose');

const collection = mongoose.connection;

var UserSchema = mongoose.Schema;
UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwd: String
})

module.exports = mongoose.model('User', UserSchema);

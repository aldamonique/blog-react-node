const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    name: {type:String, required:true, min:4, unique:true},
    username: {type:String, required:true, min:4, unique:true},
    password: {type:String, required:true},
});

const userModel = model( 'User', UserSchema);

module.exports = userModel;



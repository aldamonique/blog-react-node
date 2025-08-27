const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    name: {type:String, required:true},
    username: {type:String, required:true, minlength:4, unique:true},
    email: {
    type: String,
    required: [true, 'Please provide an email'], 
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']},    
    password: {type:String, required:true},

    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
},
  { timestamps: true, versionKey: false }

);

UserSchema.set('toJSON', {
    transform: (_doc, ret) =>{
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.password;
        return ret;
    }
});

const userModel = model( 'User', UserSchema);

module.exports = userModel;





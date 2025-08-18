const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    name: {type:String, required:true},
    username: {type:String, required:true, minlength:4, unique:true},
    password: {type:String, required:true},
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





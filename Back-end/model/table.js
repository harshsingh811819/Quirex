import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    password : {type : String},
    contact : {type : String},
    address : {type : String},
    profile : {type : String},
    userType : {type : String, default : 'user'},
    createdAt: {type : String, default : Date.now},
    updatedAt: {type : String, default : Date.now},
});

export const userModel = mongoose.model('user', userSchema);
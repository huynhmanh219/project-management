const mongoose = require('mongoose');
const generate = require('../helper/generate');

const userSchema = new mongoose.Schema({
    deleted:{
        type:Boolean,
        default:false
    },
    fullname: String,
    password:String,
    phone:String,
    email:String,
    tokenUser:{
        type:String,
        default:generate.generateRandomString(20)
    },
    avatar:String,
    status:{
        type:String,
        default: "active",
    },
    deletedAt:Date,


},
{
    timestamp:true
})

const User = mongoose.model("User",userSchema,"users");

module.exports = User;
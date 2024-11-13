const mongoose = require('mongoose');
const generate = require('../helper/generate');
const accountSchema = new mongoose.Schema({
    deleted:{
        type:String,
        default:false
    },
    fullname: String,
    password:String,
    phone:String,
    email:String,
    token:{
        type:String,
        default:generate.generateRandomString(20)
    },
    avatar:String,
    role_id:String,
    status:String,
    deletedAt:Date
},
{
    Timestamp:true
})

const Account = mongoose.model("Account",accountSchema,"accounts");

module.exports = Account;
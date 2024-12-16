const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user_id:String,
    room_id_chat:String,
    content:String,
    images : Array,
    deleted:{
        type: Boolean,
        default: false
    },
    deletedAt:Date
},{
    timestamps: true
})

const Chat = mongoose.model("Chat",chatSchema,"chat");
module.exports = Chat;
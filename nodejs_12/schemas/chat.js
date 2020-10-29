const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types:{ObjectId}} = Schema;
//채팅방아이디,유저,채팅내역,이미지주소,채팅시간
const Chat = new Schema({
    room:{
        type:ObjectId,
        required:true,
        ref:'Room'
    },
    user:{
        type:String,
        required:true,
    },
    chat:String,
    gif:String,
    createAt:{
        type:Date,
        default:Date.now,
    },
   
});

module.exports = mongoose.model('Chat',Chat);
const mongoose = require('mongoose');

const {Schema} = mongoose;
//방제목,수용인원,방장,비밀번호,생성시간
const roomSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    max:{
        type:Number,
        required:true,
        default:10,
        min:2
    },
    owner:{
        type:String,
        required:true
    },
    password:String,
    createAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Room',roomSchema);
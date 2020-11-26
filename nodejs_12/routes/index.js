const express= require('express');
const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

const router = express.Router();

router.get('/',async (req,res,next)=>{
   try {
    const rooms = await Room.find({});
    res.render('main',{rooms,title:'GIF 채팅창'});   

   } catch (error) {
       console.log(error);
       next(error);
   }

});

router.get('/room',(req,res)=>{
    res.render('room',{title:'GIF 채팅방 생성'});

})

router.post('/room',async (req,res,next)=>{
    try {
        const newRoom = await Room.create({
            title:req.body.title,
            max:req.body.max,
            owner:req.session.color,
            password:req.body.password
        });
        const io = req.app.get('io');
        //room 네임스페이스에 연결된 모든 클라이언트에 데이터를 보낸다
        //
        io.of('/room').emit('newRoom',newRoom);
        res.redirect(`/room/${newRoom}._id?password=${req.body.password}`);

    } catch (error) {
        console.log(error);
    }
});


router.get('/room/:id', async (req,res,next)=>{
    try {
        
        const room = await Room.findOne({_id:req.params.id});
        const io = req.app.get('io');
        if(!room){

        }

        const {rooms} = io.of('/chat').adapter;
        const chats = await Chat.find({room:room._id}).sort('createAt');
        return res.render('chat',{room,
                                        title:room.title,
                                    chats,
                                    user:req.session.color});

    } catch (error) {
        console.log(error);
    }
})

router.post('/room/:id/chat', async (req,res,next)=>{
    try {
        const chat = await Chat.create({
            room:req.params.id,
            user:req.session.color,
            chat:req.body.chat
        });
        req.app.get('io').of('chat').to(req.params.id).emit('chat',chat);
        res.send('ok');
    } catch (error) {
        
    }
})
module.exports=router;
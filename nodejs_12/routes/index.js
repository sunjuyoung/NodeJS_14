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

})

router.post('/room',async (req,res,next)=>{
    try {
        const newRoom = await Room.create({
            title:req.body.title,
            max:req.body.max,
            owner:req.body.owner,
            password:req.body.password
        });
        const io = req.app.get('io');
        io.of('/room').emit('newRoom',newRoom);
        res.redirect(`/room/${newRoom}._id?password=${req.body.password}`);

    } catch (error) {
        console.log(error);
    }
})
module.exports=router;
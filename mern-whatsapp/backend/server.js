//import
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Messages = require('./dbMessages');
const Pusher = require('pusher');
const cors = require('cors');




//app config
const app = express();
const PORT = process.env.PORT || 9000;
dotenv.config();

var pusher = new Pusher({
    appId: '1075225',
    key: '0ade3b8643f8f16d791d',
    secret: '221fa2958f9a90cc8e82',
    cluster: 'ap3',
    encrypted: true,
  });



//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
/* app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
}) */

//DB config
const connect_url = process.env.DBURL;
mongoose.connect(connect_url,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true});

const db = mongoose.connection;

 db.once('open',()=>{
    console.log("DB Connect");
   
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
  
    changeStream.on('change',(change)=>{
        console.log(change);

        if(change.operationType == 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('message','inserted',{
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received
            })
        }else{
            console.log("error trigger");
        }
    })
})

//route
app.get('/',(req,res)=>{
    res.status(200).send('hello');
})

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

app.post('/messages/new',(req,res)=>{
    const dbMessage = req.body;

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(`new Message create : ${data}`)
        }
    })

})

app.listen(PORT,()=>{
    console.log(`${PORT}번으로 실행`);
}) 
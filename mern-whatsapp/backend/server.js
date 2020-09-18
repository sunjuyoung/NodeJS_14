//import
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Messages = require('./dbMessages');




//app config
const app = express();
const PORT = process.env.PORT || 9000;
dotenv.config();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//DB config
const connect_url = 'mongodb+srv://users:tnqls2356@bolierplate.uwqnl.mongodb.net/admin?retryWrites=true&w=majority'
mongoose.connect(connect_url,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true});


//route
app.get('/',(req,res)=>{
    res.status(200).send('hello');
})

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
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
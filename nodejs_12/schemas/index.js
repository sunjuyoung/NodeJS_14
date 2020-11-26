const mongoose = require('mongoose');

const {MONGO_ID,MONGO_PASSWORD,NODE_ENV}= process.env;
const MONGO_URL = `mongodb+srv://admin:rnrdj123@bolierplate.uwqnl.mongodb.net/admin?retryWrites=true&w=majority`;

const connect = ()=>{
    if(NODE_ENV !== 'production'){
        mongoose.set('debug',true);
    }
    mongoose.connect(MONGO_URL,{
        dbName:'chat',
        useNewUrlParser:true,
        useCreateIndex:true

    },(error)=>{
        if(error){
            console.log(`디비에러${error}`);
        }else{
            console.log('디비연결');
        }
    })
};

mongoose.connection.on('error',(error)=>{
 console.log(error);
});
mongoose.connection.on('disconnection',()=>{
    
    connect();
});

module.exports = connect;
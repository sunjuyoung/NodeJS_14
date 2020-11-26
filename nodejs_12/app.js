//ws 모듈로 웹소켓 사용해보기
const express =require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const ColorHash = require('color-hash');

const app = express();
const indexRouter = require('./routes');
const webSocket = require('./socket');
const connect = require('./schemas');//mongoose

dotenv.config();

app.set('port',process.env.PORT || 8005);
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true
});
connect();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionMiddleware = session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false
    }
});
app.use(sessionMiddleware);
app.use((req,res,next)=>{
    if(!req.session.color){
        const colorHash = new ColorHash();
        req.session.color = colorHash.hex(req.sessionID);
    }
    next();
});



app.use('/',indexRouter);

const server = app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번으로 실행중');
});
webSocket(server,app,sessionMiddleware);

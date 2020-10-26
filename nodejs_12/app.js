//ws 모듈로 웹소켓 사용해보기
const express =require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

const app = express();
const indexRouter = require('./routes');
const webSocket = require('./socket');

dotenv.config();

app.set('port',process.env.PORT || 8005);
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false
    }
}));

app.use('/',indexRouter);

const server = app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번으로 실행중');
});
webSocket(server);

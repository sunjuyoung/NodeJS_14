const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const nunjucks = require('nunjucks');
const {sequelize} = require('./models');
const passport = require('passport');
const passportConfig = require('./passport');

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

const app = express();
const PORT = process.env.PORT || 8001;
app.set('PORT',PORT);
passportConfig();//패스포트 설정

app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true
})
sequelize.sync({force:false})
    .then(()=>{
        console.log('db연결');
    })

//app.use(cors());
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
}))
app.use(passport.initialize()); //미들웨어 req객체에 passport 설정을 심고
app.use(passport.session());//req.session객체에 passport 정보 저장 , express.session 보다 뒤에 연결

app.use("/",pageRouter);
app.use('/auth',authRouter);
app.use('/post',postRouter);

app.use((req,res,next)=>{
    const error = new Error(`${req.method}${req.url} 라우터가 없습니다`);
    error.status =404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });


app.listen(PORT,()=>{
    console.log(`${PORT}번으로 실행`);
})
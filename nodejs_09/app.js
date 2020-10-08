const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const nunjucks = require('nunjucks');
const {sequelize} = require('./models');

dotenv.config();
const pageRouter = require('./routes/page');

const app = express();
const PORT = process.env.PORT || 8000;
app.set('PORT',PORT);

app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true
})
sequelize.sync({force:false})
    .then(()=>{
        console.log('db연결');
    })

app.use(cors());
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





app.use("/",pageRouter);


app.use((req,res,next)=>{
    const error = new Error(`${req.method}${req.url} 라우터가 없습니다`);
    error.status =404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    console.log(err);
})


app.listen(PORT,()=>{
    console.log(`${PORT}번으로 실행`);
})
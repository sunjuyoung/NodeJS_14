const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const cors = require('cors');
const {sequelize} = require('./models');

const app = express();
const PORT = process.env.PORT || 8000;
app.set('PORT',PORT);
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true
})

sequelize.sync({force:false}) //true 는 서버실행시 테이블 재생성
    .then(()=>{
        console.log("DB연결");
    })
    .catch((err)=>{
        console.log(err);
    })
    app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

const indexRouter = require('./routes');
const userRouter = require('./routes/users');

app.use('/',indexRouter);
app.use('/users',userRouter);

/* app.get('/',(req,res,next)=>{
    res.render('sequelize',{user:"df"});
}); */

app.use((req,res,next)=>{
    const error = new Error(`${req.method}${req.url} 라우터가 없습니다`);
    error.status = 404;
    next(error);
});

app.use((err,req,res,next)=>{
    /* res.local.message= err.message; */
    console.log(err);
})



/* 
const pageRouter = require('./routes/page');
app.use("/",pageRouter);
 */


app.listen(PORT,()=>{
    console.log(`${PORT}번으로 실행`);
})
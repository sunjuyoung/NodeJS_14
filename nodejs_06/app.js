const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session  = require('express-session');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');

dotenv.config();
const app = express();
app.set('port',process.env.PORT||3000);

app.use(morgan('dev')); //추가적인 로그, dev, combined(배포환경),common,short,tiny..
app.use('/',express.static(path.join(__dirname,'public')));//브라우저에 접근가능 요청주소에는 public들어있지 않아 보안에 도움
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false, //
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true, //클라이언트에서 쿠리를 확인하지 못한다
        secure:false,  // https가 아닌 환경에서도 사용 가능
    },
    name:'Session-cookie',

}));

//upload폴더 생성
try{
    fs.readdirSync('uploads');
}catch(error){
    console.error('upload폴더 생성');
    fs.mkdirSync('uploads');
}

//multer 파일 업로드처리
const upload = multer({
    storage:multer.diskStorage({
        destination(req,res,done){
            done(null,'uploads/');
        },
        filename(req,file,done){
            const ext = path.extname(file.originalname); //확장자
            done(null,path.basename(file.originalname,ext)+Date.now()+ext);
        }
    }),
    limits:{fileSize:5*1024*1024},
})

 
app.use((req,res,next)=>{
    console.log('요청 실행');
    next();
});

/* app.use((req,res,next)=>{
    res.status(404).send('Not Found');
}) */

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

app.use('/',indexRouter);
app.use('/user',userRouter);



app.get('/upload',(req,res)=>{
    res.sendFile(path.join(__dirname,'multipart.html'));
  
})


/* app.post('/upload',upload.single('image'),(req,res)=>{
    console.log(req.file,req.body);
    res.send('ok');
}) */

app.post('/upload',upload.array('image'),(req,res)=>{
    console.log(req.files,req.body);
    res.send('ok');
})

/* app.get('/',(req,res,next)=>{
    //res.send("hello express");
    res.sendFile(path.join(__dirname,'index.html'));
    next();
},(req,res)=>{
    throw new Error("에러 처리 미들웨어");
}); */

app.use((err,req,res,next)=>{
    console.log(err+"에러");
    res.status(500).send(err.message);
})

app.listen(app.get('port'),()=>{
    console.log(app.get('port')+"번 포트에서 대기중");
})
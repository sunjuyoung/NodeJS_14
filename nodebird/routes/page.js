const express = require('express');
const {isNotLoggedIn,isLoggedIn} = require('./middlewares');

const router = express.Router();

//res.locals 변수는 모든 템플릿엔진에서 공통으로 사용
router.use((req,res,next)=>{
    res.locals.user = req.user; //넌적스에서 user객체를 통해 사용자 정보 접근가능
    res.locals.user =null;
    res.locals.followerCount=0;
    res.locals.followingCount=0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile',{title:'내정보 - NodeBird'});
})

//isNotLoggedIn 미들웨어 , 회원가입 페이지는 로그인하지 않은 사람에게만 보인다
router.get('/join',isNotLoggedIn,(req,res)=>{
    res.render('join',{title:'회원가입 - NodeBird'});
})

router.get('/',(req,res,next)=>{
    const twits =[];
    res.render('main',{title:'NodeBird',twits})
})


module.exports = router;
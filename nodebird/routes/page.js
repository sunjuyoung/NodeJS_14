const express = require('express');
const {isNotLoggedIn,isLogged} = require('./middlewares');

const router = express.Router();

//res.locals 변수는 모든 템플릿엔진에서 공통으로 사용
router.use((req,res,next)=>{
    res.locals.user = req.user;
    res.locals.user =null;
    res.locals.followerCount=0;
    res.locals.followingCount=0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile',isLogged,(req,res)=>{
    res.render('profile',{title:'내정보 - NodeBird'});
})

router.get('/join',isNotLoggedIn,(req,res)=>{
    res.render('join',{title:'회원가입 - NodeBird'});
})

router.get('/',(req,res,next)=>{
    const twits =[];
    res.render('main',{title:'NodeBird',twits})
})


module.exports = router;
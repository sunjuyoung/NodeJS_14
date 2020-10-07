const express = require('express');

const router = express.Router();

//미들웨어
//locals값으로 설정하여 모든 템플릿 엔진에서 공통으로 사용
router.use((req,res,next)=>{
    res.locals.user=null;
    res.locals.followerCount=0;
    res.locals.followingCount=0;
    res.locals.followerIdList=[];
}); //null,0,0,[]

router.get("/profile",(req,res)=>{
    res.render('profile',{title:'내정보 - NodeBird'});
});

router.get('/join',(req,res)=>{
    res.render('join',{title:'회원가입 - NodeBird'});
})

router.get('/',(req,res)=>{
    const twits = [];
    res.render('main',{title:' NodeBird',twits});
})

module.exports = router;
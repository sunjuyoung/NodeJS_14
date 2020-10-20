const express = require('express');
const {isLoggedIn ,isNotLoggedIn} = require('./middlewares');
const router = express.Router();
const {Post,User} = require('../models');

//미들웨어
//locals값으로 설정하여 모든 템플릿 엔진에서 공통으로 사용
router.use((req,res,next)=>{
    res.locals.user=req.user;
    res.locals.followerCount=0;
    res.locals.followingCount=0;
    res.locals.followerIdList=[];
    next();
}); //null,0,0,[]

router.get("/profile", isLoggedIn,(req,res)=>{ //로그인 해야 가능 , req.isAuthenticated() true이면 next 호출되어 넘어간다
    res.render('profile',{title:'내정보 - NodeBird'});
});

router.get('/join',isNotLoggedIn,(req,res)=>{
    res.render('join',{title:'회원가입 - NodeBird'});
})

router.get('/', async (req,res,next)=>{
    try {
        const posts = await Post.findAll({
            include:{
                model:User,
                attributes:['id','nick'],
            },
            order:[['createdAt','DESC']],
        });
        res.render('main',{title:'NodeBird',twits:posts})
    } catch (error) {
        console.log(error);
        next(error);
        
    }
})

module.exports = router;
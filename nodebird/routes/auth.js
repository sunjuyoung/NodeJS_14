const express = require('express');
const {isNotLoggedIn,isLoggedIn} = require('./middlewares');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

/**
 * 회원가입
 */
router.post('/join',isNotLoggedIn,async (req,res,next)=>{
    const {email,nick,password} = req.body;
    try{
        const exUser = await User.findOne({where:{email}});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        //같은 이메일이 없다면 비밀번호를 암호화해서 저장
        const hash = await bcrypt.hash(password,12);
        await User.create({
            email,
            nick,
            password:hash
        });
        return res.redirect('/');

    }catch(err){
        console.error(err);
        return next(err);
    }
})

//로그인
router.post('/login',isNotLoggedIn,(req,res,next)=>{
    //로컬 로그인 전략, 라우터미들웨어 안에 들어 있다
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){ //첫번째 매개변수 authErr값이 있다면 실패
            console.error(authError);
            return next(authError)
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user,(loginError)=>{//두번째 매개변수가 있다면 성공, req.login 메서드 호출 (logout메서드도 있다),passport.serializeUser를 호출
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });

    })(req,res,next); //미들웨어 내의 미들웨어에는 (req,res,next)를 붙입니다.
});

//로그아웃
router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout(); //req.user 객체를 제거
    req.session.destroy();
    res.redirect('/');

})

//카카오 로그인 창으로 리다이렉트
router.get('/kakao',passport.authenticate('kakao'));


//로그인 성공여부결과를 받는다
//로컬로그인과 다른게 passport.authenticate 메서드에 콜백함수를 제공하지 않는다 카카오 내부적으로 호출
//실패헀을시 어디로 이동할지만 정한다
router.get('/kakao/callback',passport.authenticate('kakao',{
    failureRedirect:'/',
}),(req,res)=>{
    res.redirect('/');
})

module.exports = router;
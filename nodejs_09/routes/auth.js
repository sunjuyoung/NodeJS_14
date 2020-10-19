const express = require('express');
const {isLoggedIn ,isNotLoggedIn} = require('./middlewares');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        return res.redirect('/join?error=exist');
      }
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        nick,
        password: hash,
      });
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });

router.post('/login',isNotLoggedIn, (req,res,next)=>{
        //로컬 전략 으로 설정
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.log(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        //Passport는 req객체에 login과 logout 메서드를 추가합니다 
        // req.login 은 passport.serializeUser 호출합니다
        return req.login(user,(loginError)=>{
            if(loginError){
                console.log(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
        
    })(req,res,next); //미들웨어 내의 미들웨어는
})


router.get('/logout', isLoggedIn,(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
})


router.get('/kakao',passport.authenticate('kakao'));

router.get('/kakao/callback',passport.authenticate('kakao',{
    failureRedirect:'/',
}),(req,res)=>{
    res.redirect('/');
});


module.exports = router;
const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

/* 
serializeUser 로그인시 실행 , req.session 어떤 데이터를 저장할지 정하는 메서드
done함수의 첫번째인수는 에러발생시 사용, 두번째는 저장하고싶은 데이터 ,용량관리로 아이디만 저장
deserializeUser는 매요청시 실행, 매개변수 id는 serializeUser에서 done두번째 인수인 userid

이 과정은
사용자 정보 객체를 세션에 아이디로 저장하고 
세션에 저장한 아디를를 통해 원할때 사용자 정보 객체를 불러온다
(세션에 아이디 이외 불필요한 데이트를 담아두지 않는다)
*/

module.exports =()=>{
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
        User.findOne({where:{id}})
        .then(user=> done(null,user))
        .catch(err=>done(err));
    });

    local();
    kakao();
}
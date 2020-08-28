const passport = require('passport');
const local = require('./localStrategy'); //각각 로컬 로그인과 카카오 로그인 전략에대한 파일
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

//모듈 내부는 serializeUser,deserializeUser 가 있다.
//serializeUser 로그인시 실행되며 req.session객체에 어떤 데이터를 저장할지 정하는 메서드
//deserializeUser 매 요청 시 실행된다
//

module.exports =()=>{
    passport.serializeUser((user,done)=>{
        done(null,user.id) //첫번쨰 인수는 에러발생시,두번째 인수는 저장하고싶은 데이터
        //사용자 정보모두를 저장하면 용량이 커져 아이디만 저장
    });
    passport.deserializeUser((id,done)=>{
        User.findOne({where:{id}})
        .then(user=>done(null,user)) // req.user저장
        .catch(err=>done(err));
    });
    local();
    kakao();
}


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

//데이터베이스에서 일치하는 이메일이 있는지 찾은 후 있다면 bcrypt의 compare 함수로 비밀번호 비교
module.exports =()=>{
    //LocalStrategy
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    }, async (email,password,done)=>{ 
        try{
            const exUser = await User.findOne({where:{email}});
            if(exUser){
                const result = await bcrypt.compare(password,exUser.password);
                if(result){
                    console.log('로그인 성공');
                    done(null,exUser);
                }else{
                    done(null,false,{message:'비밀번호가 일치하지 않습니다'});
                }
            }else{
                done(null,false,{message:'가입되지 않은 회원입니다.'});
            }
        }catch(err){
            console.error(err);
            done(err);
        }
    })
    
    )
}
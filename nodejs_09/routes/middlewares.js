//로그인 여부 파악
//Passport는 req 객체에 isAuthenticated 메서드를 추가합니다 true or false
//로그인한 사용자는 회원가입,로그인 라우터에 접근하지 못한다
//로그인하지 않은 사용자는 로그아웃 라우터에 접근하지 못한다.

exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    }else{
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
}
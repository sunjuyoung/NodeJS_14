//라우터 접근 조건
//로그인한 사용자는 회원가입과 로그인 라우터에 접근하면 안된다.
//passport는 req객체에 isAuthenticated 메서드를 추가합니다. 로그인 중이면 true
//page.js에서 isLoggedIn,isNotLoggedIn 

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
        const message = encodeURIComponent('로그인한 상태입니다');
        res.redirect(`/?error=${message}`);
    }
}
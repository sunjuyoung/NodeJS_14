//이미지 경로 저장 , 이미지는 서버 디스크에 저장
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {Post,Hashtag} = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더 생성')
    fs.mkdirSync('uploads');
}

//uploads폴더에 파일명+현재시간.확장자 파일명으로 업로드
const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads/');
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            cb(null,path.basename(file.originalname,ext)+Date.now()+ext);
        }
    }),
    limits:{fileSize:5*1024*1024}
})

//이미지 하나를업로드받은뒤 이미지의 저장 경로를 클라이언트로 응답
router.post('/img',isLoggedIn,upload.single('img'),(req,res)=>{
    console.log(req.file);
    res.json({url:`/img/${req.file.filename}`});
})

const upload2= multer();
router.post('/',isLoggedIn,upload2.none(),async(req,res,next)=>{//이미지 데이터가 들어있지 않으므로 none
    try {
        const post = await Post.create({
            content:req.body.content,
            img:req.body.url,
            UserId:req.user.id
        })
        const hashtags =req.body.content.match(/#[^\s#]+/g);
        //추출한 해시태그 저장
        if(hashtags){
            const result = await Promise.all(
                hashtags.map(tag=>{
                    return Hashtag.findOrCreate({
                        where:{title:tag.slice(1).toLowerCase()}, //#을 떼고 소문자로 바꿉니다
                    })
                })
            )
            await post.addHashtags(result.map(r=>r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.log(error);
        next(error);
    }

})

module.exports = router;
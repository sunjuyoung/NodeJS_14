const express = require('express');
const {User,Comment} = require('../models');

const router = express.Router();

//댓글 수정 삭제
router.route('/:id')
    .patch(async (req,res,next)=>{
        try{
            const result = await Comment.update({
                comment:req.body.comment
            },{
                where:{id:req.body.id}
            })

        }catch(err){
            console.error(err);
        }
    })
    .delete(async (req,res,next)=>{
        try{
            const result = await Comment.delete({
                where:{id:req.params.id}
            })
            res.json(result);
        }catch(err){
            console.error(err);
        }
    });


    module.exports = router;
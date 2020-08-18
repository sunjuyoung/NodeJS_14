const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/')
    .get(async (req,res,next)=>{
        try{
            const users = await User.findAll();
            res.json(users);
        }catch(err){

        }
    })
    .post(async (req,res,next)=>{
        try{
            const user = await User.create({
                name:req.body.name,
                age:req.body.age,
                married:req.body.married
            })
            console.log(user);
            res.status(201).json(user);
        }catch(err){
            
        }
    })
    
    module.exports = router;
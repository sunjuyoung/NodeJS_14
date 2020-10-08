const express = require('express');
const {isLoggedIn ,isNotLoggedIn} = require('./middlewares');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

router.post('/join',isNotLoggedIn, async(req,res,next)=>{
    const {email,nick,password}=req.body;
    try {
        const exUser = User.findOne({where:{email}});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password,12);
        await User.create({
            email,nick,password:hash
        })
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return next(error);
        
    }
})
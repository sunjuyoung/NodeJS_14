const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/').get( async (req,res,next)=>{
    try {
        const users = await User.findAll();
        res.json(users);

    } catch (error) {
        console.log(error);
    }
})
.post(async (req,res,next)=>{
    try {
        const user = await User.create({
            name:req.body.name,
            age:req.body.age,
            married:req.body.married
        });
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        next(error);
    }
})










module.exports = router;
const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', async(req,res,next)=>{
    try {
        const users = await User.findAll();
        res.json(users);


    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = router;
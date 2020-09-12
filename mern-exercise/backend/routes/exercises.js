const express =require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');


router.route('/').get((req,res)=>{
    Exercise.find().then(ex=>res.json(ex))
    .catch(err=>res.status(400).json('Error'));
});


router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise= new Exercise({username,
        description,
        duration,
        date});

    newExercise.save().then(()=>res.json('Exercise add'))
    .catch(err=>res.status(400).json('Error'));
});

router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)
    .then(ex=>res.json(ex))
    .catch(err=>res.status(400).json('Error'));
})
.delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(res.json('Exercise deleted'))
    .catch(err=>res.status(400).json('Error'));
})

router.route('/update/:id').post((req,res)=>{
    Exercise.findById(req.params.id)
    .then(ex=>{
        ex.username=req.body.username;
        ex.description=req.body.description;
        ex.duration=Number(req.body.duration);
        ex.date=Date.parse(req.body.date);
        ex.save()
        .then(()=>res.json("update!"))
        .catch(err=>res.status(400).json('Error'));
    } )
    .catch(err=>res.status(400).json('Error'));
})


module.exports = router;
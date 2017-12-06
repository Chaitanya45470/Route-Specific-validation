const express=require('express');
const router=express.Router();

router.get('/',function(req,res){
res.render('index2');
});

router.post('/',function(req,res){
    if(req.body.Username.length<'8'){
        res.send('<h1>Username must be atleast 8 characters');
    }
    res.render('index3',{
        title:req.body.Username
    });
});

router.get('/:username',function(req,res){
    res.render('index3',{
        title:req.params.username,
        dept:req.query.dept
    });
});
    
    

module.exports=router;

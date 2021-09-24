const express=require('express');
const router=express.Router();

router.get('/test',((req,res)=>{
    res.status(200).json({
        msg:"we are up and running!!!"
    });
}));

module.exports=router;
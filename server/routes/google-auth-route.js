const express=require('express');
const { getGoogleAuthUrl } = require('../controllers/google-auth-controller');
const router=express.Router();

router.get('/google/url',getGoogleAuthUrl);

router.get('/test',((req,res)=>{
    res.status(200).json({
        msg:"we are up and running!!!"
    });
}));

module.exports=router;
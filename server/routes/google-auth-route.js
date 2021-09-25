const express=require('express');
const { getGoogleAuthUrl, getGoogleUserWithCode } = require('../controllers/google-auth-controller');
const router=express.Router();

router.get('/google/consent',getGoogleAuthUrl);
router.get('/google/code',getGoogleUserWithCode);
router.get('/')

router.get('/test',((req,res)=>{
    res.status(200).json({
        msg:"we are up and running!!!"
    });
}));

module.exports=router;
const express=require('express');
const { sendMail, createDraftMail } = require('../controllers/google-mail-controller');

const router=express.Router();

router.post('/gmail/send-mail',sendMail);
router.post('/gmail/create-draft',createDraftMail);

module.exports=router;
const express=require('express');

//const { authorize } = require('passport');
 const router=express();

 const controller=require('../controller/sellerController');
router.use(express.urlencoded({ extended: true }))
router.post('/save',controller)


module.exports=router
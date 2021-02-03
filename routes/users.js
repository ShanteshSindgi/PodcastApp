const express=require('express');
const router=express.Router();
const userController=require('./../controllers/userController')


router.get('/login',userController.loginUser);
router.get('/signup',userController.signUpUser);

module.exports=router;
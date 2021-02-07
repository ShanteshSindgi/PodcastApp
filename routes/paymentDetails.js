const express=require('express');
const router=express.Router();
const paymentDetailsController=require('./../controllers/paymentDetailsController')




//Fetch Notification
router.get('/fetch',paymentDetailsController.fetchPaymentDetails);







module.exports=router;
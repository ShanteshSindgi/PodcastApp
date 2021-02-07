const express=require('express');
const router=express.Router();
const subscriptionController=require('./../controllers/subscriptionController')
const checkauth=require('./../middleware/checkAuth');


//Add Subscription
router.post('/add',subscriptionController.addSubscription);

//Fetch Subscription
router.get('/fetch',subscriptionController.fetchSubscriptions);


//Update Subscription
router.put('/updateSubscription/:subscriptionid',subscriptionController.updateSubscription);


//Delete Subscription
router.delete('/deleteSubscription/:subscriptionid',subscriptionController.deleteSubscription);


//BuySubscription

router.post('/buy',checkauth.authorization, subscriptionController.buySubscription);



module.exports=router;
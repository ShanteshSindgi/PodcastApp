const express=require('express');
const router=express.Router();
const notificationController=require('./../controllers/notificationController')


//Add Notification
router.post('/add',notificationController.addNotification);

//Fetch Notification
router.get('/fetch',notificationController.fetchNotifications);


//Update Notification
router.put('/updateNotification/:notificationid',notificationController.updateNotification);


//Delete Notification
router.delete('/deleteNotification/:notificationid',notificationController.deleteNotification);




module.exports=router;
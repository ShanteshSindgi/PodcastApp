const express=require('express');
const router=express.Router();
const tagController=require('./../controllers/tagController')


//Add Tag
router.post('/add',tagController.addTag);

//Fetch Tag
router.get('/fetch',tagController.fetchtags);


//Update Tag
router.put('/updateTag/:tagid',tagController.updateTag);


//Delete Tag
router.delete('/deleteTag/:tagid',tagController.deletetTag);




module.exports=router;
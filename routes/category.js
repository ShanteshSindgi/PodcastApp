const express=require('express');
const router=express.Router();
const categoryController=require('./../controllers/categoryController')


//Add Category
router.post('/add',categoryController.addCategory);

//Fetch Category
router.get('/fetch',categoryController.fetchCategorys);


//Update Category
router.put('/updateCategory/:categoryid',categoryController.updateCategory);


//Delete Category
router.delete('/deleteCategory/:categoryid',categoryController.deleteCategory);




module.exports=router;
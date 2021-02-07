const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
const CategorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    categoryTags:[]
    ,
    date:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model('Categories',CategorySchema);
const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
const TagsSchema=new mongoose.Schema({
    tagName:{
        type:String,
        required:true
    },
    tagDescription:{
        type:String,
        required:true
    },
    
    date:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model('Tags',TagsSchema);
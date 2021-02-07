const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
var uniqueValidator = require('mongoose-unique-validator');

const TagsSchema=new mongoose.Schema({
    tagName:{
        type:String,
        required:true,
        unique:true
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
TagsSchema.plugin(uniqueValidator);

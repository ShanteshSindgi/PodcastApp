const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"ACTIVE"
    },
    date:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model('Users',UserSchema);
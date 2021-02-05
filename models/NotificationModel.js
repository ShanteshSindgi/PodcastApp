const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
const NotificationSchema=new mongoose.Schema({
    notificationName:{
        type:String,
        required:true
    },
    notificationDescription:{
        type:String,
        required:true
    },
    
    date:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model('Notifications',NotificationSchema);
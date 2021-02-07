const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);

const SubscriptionSchema=new mongoose.Schema({
    subscriptionName:{
        type:String,
        required:true
    },
    subscriptionPrice:{
        type:Number,
        required:true
    },
    subscriptionFeatures:{
        type:String,
        required:true
    },
    
    subscriptionDuration:{
        type:Number,
        default:1
    }
});
module.exports=mongoose.model('subscription_details',SubscriptionSchema);
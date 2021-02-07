const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
const PaymentDetailsSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    transactionid:{
        type:String,
        required:true
    },
    subscriptionid:{
        type:String,
        required:true
    }
    ,
    purchasedDate:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model('PaymentDetails',PaymentDetailsSchema);
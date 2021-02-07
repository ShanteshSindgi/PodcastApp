const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false);
var uniqueValidator = require('mongoose-unique-validator');



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
        type:Boolean,
        default:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    subscriptionTaken:[
        {
        subscriptionid:{
            type:String,
            unique:true,
            default:"NA",
        },
        subscriptionPurchasedDate:{
            type:Date,
            
        }
    },
]
    
    
});
module.exports=mongoose.model('Users',UserSchema);
UserSchema.plugin(uniqueValidator);

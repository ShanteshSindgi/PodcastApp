const jwt = require('jsonwebtoken');
const UserModel=require('./../models/UserModel')
const dotenv = require("dotenv");
dotenv.config();
let userid;




exports.getUserid = () => {
  // console.log("emailssdsd_Khali",email);
  return userid;
}


 exports.authorization = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(authHeader);
  if(token==null)
  {
    res.status(401).json({
      "message":"Token Not Found"
    })
  }
  else{
  jwt.verify(token, process.env.JWT_KEY, (err, verifiedJwt) => {
    if(err){
      console.log(err);
      res.json(err.message)

    }else{
      console.log(verifiedJwt.email)
      UserModel.findOne({email:verifiedJwt.email}).then(
        (data)=>{
          console.log(data);
          // res.status(200).json(data);
          userid=verifiedJwt.userid;
          next()

        }
      ).catch(
        (err)=>{
          res.status(401).json({
            "message":"No User Found"
          });
        }
      )
    }
  })
}
 }


 exports.adminAuthorization=(req,res,next)=>{
   const userid=this.getUserid();
   console.log(userid);
    UserModel.findOne({_id:userid}).then(
      (data)=>{
        console.log("d",data);
        if(data.role=="admin")
        {
          // res.status(200).json({"message":"Admin Access"})
          next()
        }
        else{
          res.status(401).json({"message":"Access Restricted"})

        }
      }
    )

 }
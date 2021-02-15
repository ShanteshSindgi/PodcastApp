const User = require("./../models/UserModel");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const path = require('path');

const dotenv = require("dotenv");
dotenv.config();
let passwordtoken;
exports.loginUser = async (req, res) => {
  const userInput = await new User({
    email: req.body.email,
    password: req.body.password,
  });

  const userData = await User.findOne({
    email: userInput.email,
  });
  if (!userData) {
    return res.status(404).json({
      msg: "Account not found",
    });
  }

  const isMatch = await bcrypt.compare(userInput.password, userData.password);
  // console.log(userInput.password, userData.password, isMatch);

  if (!isMatch) {
    return res.status(401).json({
      msg: "Invalid Credentials",
    });
  }

  const token = await jwt.sign({
      userid: userData._id,
      username: userData.username,
      email: userData.email,
    },

    process.env.JWT_KEY
    // {
    //   expiresIn: "1h",
    // }
  );

  res.status(200).json({
    msg: "User Login Successful",
    token: token,
  });
};

exports.signUpUser = async (req, res, next) => {
  User.findOne({
    email: await  req.body.email,
  }).then((user) => {
    if (user) {
      res.status(409).json("User Already Exists");
      next();
    } else {
      const newUser =  new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then(
              (data) => {
                // console.log("d", data);
                const token =  jwt.sign({
                    userid: data._id,
                    username: data.username,
                    email: data.email,
                  },

                  process.env.JWT_KEY
                  // {
                  //   expiresIn: "1h",
                  // }
                );
                res.status(200).json({
                  "message": "User Registered Successfully",
                  "token":token
                });
              })
            .catch(
              (err) => {
                console.log(err);
              });
        });
      });
    }
  });
};

exports.forgetPassword = async (req, res) => {
  console.log("dta", req.body);
  const email = req.body.email;
  if (!email) {
    res.status(404).json("Email Not Found");
  } 
  const userData = await User.findOne({
    email: email,
  });
  
   if (!userData) {
    return res.status(404).json({
      msg: "Account not found",
    });
  }
  else {
    const token = await jwt.sign({
        email: email,
      },

      process.env.JWT_KEY, {
        expiresIn: "1h",
      }
    );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bookmymovie30@gmail.com",
        pass: "bookmymovie7",
      },
    });

    var mailOptions = {
      from: "bookmymovie30@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Go to this Link ${process.env.API_URL}/users/passwordreset/?token=` +
        token,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
          token: token,
        });
      }
    });
  }
};

exports.passwordReset = (req, res) => {
  console.log(req.body);
  console.log(req.query.token);
   passwordtoken = req.query.token;
  jwt.verify(passwordtoken, process.env.JWT_KEY, (err) => {
    console.log(process.env.JWT_KEY);
    if (err) {
      console.log(err);
      return res.status(403).json({
        message: "Token expire",
      });
    } else {
      res.sendFile(path.join(__dirname+'/forgetPassword.html'));
      
    }
  });
};
exports.passwordresetSuccessfull = (req, res) => {
  console.log(req.query.password);
  const password=req.query.password;
  if(!passwordtoken || !password)
  {
    res.json(500).json("Something went wrong")
  }
  else{
    
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        jwt.verify(passwordtoken, process.env.JWT_KEY, (err, verifiedJwt) => {
          if(err){
            console.log(err);
            res.json(err.message)
      
          }else{
            console.log(verifiedJwt.email)
            User.findOneAndUpdate({
              email: verifiedJwt.email,
            }, {
              password: hash,
            },
            (err, result) => {
              if (err) {
                res.status(204).json({
                  message: " Password Not Updated",
                });
                console.log(err);
              } else {
                res.status(200).json({
                  message: "Password Updated Successfully,You can login now",
                });
              }
            }
          );
          }
        })
      });
    });




  }
};

exports.fetchUsers = async (req, res) => {
  console.log(req.query);
  const pagesize = +req.query.pagesize;
  const currentpage = +req.query.page;
  const Count = await User.estimatedDocumentCount({}, (Err, count) => {
    if (Err) {
      console.log(Err);
    }
    return count;
  });
  const UserQuery = User.find();
  if (pagesize && currentpage) {
    UserQuery.skip(pagesize * (currentpage - 1)).limit(pagesize);
  }
  UserQuery.find()
    .then((data) => {
      res.status(200).json({
        message: "Users  data received successfully",
        userList: data,
        totallength:Count
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(404).json({
        message: "No Data Found",
        posts: data,
      });
    });
};

exports.updateUser = async (req, res) => {
  const userid = await req.params.userid;
  const username = await req.body.username;
  const email = await req.body.email;
  const role = await req.body.role

  if (!userid || !username || !email || !role) {
    res.status(404).json({
      message: "invalid Params",
    });
  } else {
    User.findByIdAndUpdate({
        _id: userid,
      }, {
        email: email,
        username: username,
        role: role
      },
      (err, result) => {
        if (err) {
          res.status(204).json({
            message: "User Not Updated",
          });
          console.log(err);
        } else {
          res.status(200).json({
            message: "User Updated Successfully",
          });
        }
      }
    );
  }
};

exports.deleteUser = (req, res) => {
  const userid = req.params.userid;

  if (!userid) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    console.log("user", userid);
    User.deleteOne({
        _id: userid,
      },
      (err, data) => {
        if (err) {
          console.log("er", err);
          res.status(204).json({
            message: "User deletion failed",
          });
        } else {
          res.status(200).json({
            message: "User deleted Successfully",
          });
        }
      }
    );
  }
};

exports.userStatus = (req, res) => {
  const userid = req.params.userid;
  console.log(req.query.status);
  const status = (req.query.status === 'true');

  if (!userid) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    User.findByIdAndUpdate({
        _id: userid,
      }, {
        status: !status,
      },
      (err, result) => {
        if (err) {
          res.status(204).json({
            message: "User Status not Updated",
          });
          console.log(err);
        } else {
          res.status(204).json({
            message: "User Status Updated Successfully",
          });
        }
      }
    );
  }
};
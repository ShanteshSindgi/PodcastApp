const User = require('./../models/UserModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');


const dotenv = require("dotenv");
dotenv.config();
exports.loginUser = async (req, res) => {
    const userInput = await new User({
        email: req.body.email,
        password: req.body.password,
    });

    const userData = await User.findOne({
        email: userInput.email
    });
    if (!userData) {
        return res.status(400).json({
            msg: "Account not found"
        });
    }

    const isMatch = await bcrypt.compare(userInput.password, userData.password);
    // console.log(userInput.password, userData.password, isMatch);

    if (!isMatch) {
        return res.status(400).json({
            msg: "Invalid Credentials"
        });
    }

    const token = await jwt.sign({
            userid: userData._id,
            username: userData.username,
            email: userData.email,
        },

        process.env.JWT_KEY, {
            expiresIn: "1h",
        }

    );

    res.status(200).json({
        msg: "User Login Successful",
        token: token
    });
};



exports.signUpUser = (req, res, next) => {
    console.log("SAd", req.body)

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            res.status(409).json("User Already Exists");
            next();
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash;

                    newUser.save().then(() => res.status(200).json("User Registered Successfully")).catch(err => {
                        console.log(err)
                    })
                })
            })
        }
    })
}

exports.forgetPassword = async (req, res) => {

    console.log("dta", req.body);
    const email = req.body.email;
    if (!email) {
        res.json("Email Not Found");
    } else {
        const token = await jwt.sign({
                email: email,
            },

            process.env.JWT_KEY, {
                // expiresIn: "1h",
            }

        );
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bookmymovie30@gmail.com',
                pass: 'bookmymovie7'
            }
        });

        var mailOptions = {
            from: 'bookmymovie30@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: "Go to this Link http://localhost:3200/users/passwordreset/?token=" + token
        };

        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
            } else {

                console.log('Email sent: ' + info.response);
                res.status(200).json({
                    "token": token
                });

            }
        });
    }

}

exports.passwordReset = (req, res) => {

    console.log(req.body);
    console.log(req.query.token);
    const tokens = req.query.token;
    console.log("token", tokens);
    jwt.verify(tokens, process.env.JWT_KEY, (err) => {
        console.log(process.env.JWT_KEY);
        if (err)
        {
            console.log(err);
            return res.status(403).json({
                "message": "Token expire"
            })
        } else {
            res.send(
                '<h1>Password Reset <h1> <input '
            )
        }
    })

}
exports.passwordresetSuccessfull = (req, res) => {
    console.log(req.query.password)
    res.json("success");
}

exports.fetchUsers = async (req, res) => {

  console.log(req.query);
  const pagesize=+req.query.pagesize;
  const currentpage=+req.query.page;
  const UserQuery= User.find();
  if(pagesize && currentpage)
  {
      UserQuery
      .skip(pagesize*(currentpage-1))
      .limit(pagesize)

  }
  UserQuery.find().then(
    (data) => {
      res.status(200).json({
        message: "Users  data received successfully",
        userList: data
      });
    }
  ).catch(
      (err)=>{
          console.log(err);

          res.status(404).json({
            message: "No Data Found",
            posts: data
          });
          
      }
  )

}
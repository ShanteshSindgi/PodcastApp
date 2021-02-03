const User = require('./../models/UserModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt=require('jsonwebtoken')

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
                name: req.body.username,
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
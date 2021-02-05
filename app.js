const express = require('express');
const mongoose = require('mongoose')
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(express.static(__dirname));
const router=require('./routes/users');
const port = process.env.PORT;
const cookieSession = require('cookie-session')
const passport = require('passport');

//require('./../Nodemon.json').config();
app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
app.use('/users',router);
app.use("/",(req,res)=>{
    res.json("WELCOME TO SERVER")
})

// console.log(process.env.S)
// console.log(process.env.MONGO_CONNECTION);
mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
    console.log('connected');

}).catch(
    (err) => {
        console.log(err);
    }
);
console.log("port",process.env.PORT)
app.listen(port, () => {
    console.log("running")
})
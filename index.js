const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT;
const dotenv = require("dotenv");
dotenv.config();


const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(express.static(__dirname));


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

// console.log(process.env.S)
// console.log(process.env.MONGO_CONNECTION);
mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
    console.log('connected');

}).catch(
    (err) => {
        console.log(err);
    }
);

app.listen(port, () => {
    console.log("running")
})
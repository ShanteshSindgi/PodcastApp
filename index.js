
const express=require('express');
const mongoose=require('mongoose')
const app=express();
const port=process.env.PORT || 3200;


const bodyparser=require('body-parser');

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
mongoose.connect('mongodb+srv://admin:admin@cluster0.s2prn.mongodb.net/Podcast?retryWrites=true&w=majority').then(()=>{
  console.log('connected');

}).catch(
  (err)=>{
    console.log(err);
  }
);

app.listen(port,()=>{
  console.log("running")
})

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./../models/UserModel')
const dotenv = require("dotenv");
dotenv.config();
let atoken="";
passport.serializeUser(function(user, done) {
  
    done(null, user);
     console.log("aish",user)
  });

passport.deserializeUser(function(user, done) {
    
    done(null, user);
});

passport.use(new GoogleStrategy({
  
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
     callbackURL:"http://localhost:3200/users/google/callback/",
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log("hi")

    // console.log("FGHJKKJHGFGHJK",accessToken);
    // console.log(accessToken,request,refreshToken);
    console.log("bodyyy",profile);
    // console.log("asdsadsad",request.body.token);
    User
    .findOne({email:profile.email})
    .then((currentUser)=>{
      if(currentUser){
        console.log('User Exists'+currentUser);
        
        User.findOneAndUpdate(
          {email:profile.email},{password:accessToken}
        ).then(()=>{
          console.log("success");
        })
        
      } else{
        new User({
          username:profile.displayName,
          email: profile.email,
          password: accessToken
        }).save().then((newUser)=>{
           console.log('New user created'+newUser);
        })
      }
    })
    // console.log(profile)
    atoken=accessToken;
    return done(null,profile,accessToken);
  }
));


exports.getAccessToken=()=>{
  return atoken;

}

// app.post('/login',
//   passport.authenticate(
//     'authtoken',
//     {
//       session: false,
//       optional: false
//     }
//   ),
//   function(req, res) {
//     res.redirect('/');
//   }
// );

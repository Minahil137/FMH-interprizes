// Require the NPM packages that we need
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const user = require('../models/usermodel')
const Otp = require('../models/otpmodel')
const passport = require('passport')
require("../config/password")(passport)
// Initalise a new express application
const app = express();

app.use(passport.session())
// Set a default environment port or cutom port - 5000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set Cookie Parser, sessions and flash
app.use(cookieParser('NotSoSecret'));
app.use(session({
   secret: 'something',
   cookie: { maxAge: 60000 },
   resave: true,
   saveUninitialized: true
}));
app.set('view engine', 'ejs');
app.use(passport.initialize())

app.use(flash());
const indexpage = (req, res) => {

   res.render('index.ejs')
}

const forgotpasswordpage = (req, res) => {
   const error = req.flash('user');
   res.render('forgotpass.ejs', { error: req.flash('error') })
}

const changepasswordpage = (req, res) => {
   const error = req.flash('user');

   res.render('changepass.ejs', { user: req.user, error: req.flash('error') })
}

const nameDuplicate = (re, res, next) => {
   user.findOne({ "username": re.body.username }).then(response => {
      if (response) {
         m = 'UserName Already exist kindly try another one!'

         error = 1
         re.flash('message', m)
         res.redirect('/')


      } else {
         return next()
      }
   })

}
const authenticat = (re, res, next) => {
   console.log(re.body)
   passport.authenticate('local', {
      failureRedirect: '/login',
      successRedirect: '/seller',

   })(re, res, next);
}

const emailDuplicate = (re, res, next) => {
   console.log('elllooooooooooooo')
   user.findOne({ "Email": re.body.Email }).then(response => {
      if (response) {
         console.log(response)
         m = 'WE Already have an account associated with this email!'
         re.flash('message', m)
         res.redirect('/')

      }
      else {
         return next()
      }
   })

}
//



const store = (req, res) => {

   const u = new user({
      username: req.body.username,
      Email: req.body.Email,
      password: req.body.password,


   })



   u.save().then(() => {
      req.flash('message', "data submitted")
      m = 'Data saved!'
      res.redirect('/')


   }

   )
}
const login = (re, res) => {
   res.render('login.ejs', { error: re.flash('error') })
}
const dash = (re, res) => {

   res.render('dashboard.ejs')
}
const emailSend = async (req, res) => {
   let data = await user.findOne({email: req.body.email});
   let successes = [];
   const emailc = req.body.email;
   if(data)
   {
       let otpcode = Math.floor((Math.random()*10000)+1);
       let otpdata = new Otp({
           email: req.body.email,
           code: otpcode,
           expireIn: new Date().getTime() + 300*1000
       })
       let otpResponse = await otpdata.save();
       mailer(req.body.email,otpcode);
       m = 'Please Check Your Email for OTP.'
      req.flash('message', m)
      res.render("changepass.ejs", { successes, emailc })
   }
   else
   {
       m = 'Email Not Found..'
       req.flash('message', m)
       res.redirect("/ForgotPassword");
   }
};

const changePassword = async (req,res)=>{
   let data = await Otp.find({email:req.body.email,code:req.body.otpCode});
   let error = [];
   if(data)
   {
       let currentTime = new Date().getTime();
       let diff = data.expireIn - currentTime;
       if(diff < 0)
       {
           m = 'Token Expired'
           req.flash('message', m)
           res.redirect("/ForgotPassword");
       }
       else
       {
           let User = await user.findOne({ email: req.body.email })
           User.password = req.body.password;
           User
           .save()
           .then(user => {
               req.flash(
                   "success_msg",
                   "Your Password has been changed."
               );
               res.redirect("/login");
               res.status(200).json();
           })
           .catch(err => console.log(err));
       }
   }
   else
   {
       req.flash(
           "error_msg",
           "Incorrect OTP or Email."
       );
       res.redirect("/email-send");
   }
};

//function for mailer
const mailer = (email,otp)=>{
   var nodemailer = require('nodemailer');
   var transporter = nodemailer.createTransport({
       service: 'gmail',
       port: 587,
       secure: false,
       auth: {
           user: 'apni email',
           pass: 'apna pass'
       }
   });
   var mailOptions = {
       from: 'apni email',
       to: email,
       subject: 'Reset Password',
       text: 'apna message' + otp 
   };
   transporter.sendMail(mailOptions, function(error, info){
       if(error)
       {
           console.log(error);
       }
       else
       {
           console.log('Email Sent: ' + info.response);
       }
   });
}
const map=(re,res)=>{

   
      const message = re.flash('user');
      res.render('map.ejs', { message:re.flash('message')})
   }
   const signUp=(re,res)=>{
     
      const message = re.flash('user');
      res.render('signup.ejs', { message:re.flash('message')})
    }
module.exports = { store, nameDuplicate, indexpage, emailDuplicate, login, authenticat, dash, changePassword, emailSend, changepasswordpage, forgotpasswordpage,signUp,map }

//
//const FaisalabadLocation=


//module.exports = { store,nameDuplicate,indexpage,emailDuplicate,login,authenticat,dash,map,signUp}
   
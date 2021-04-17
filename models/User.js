// include mongoose
const mongoose = require('mongoose');

// include email validator
const { isEmail } = require('validator');

// include bcrypt
const bcrypt = require('bcrypt');

//include nodemailer
const nodemailer = require('nodemailer');
require('dotenv').config();
// include jwt
const jwt=require('jsonwebtoken');

// define schema
const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, 'Please enter an username'],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  name:String,
  batch:Number,
  skills:{type:Array,lowercase:true},
  jobs:{type:Array},
  interns:{type:Array},
  glink:String,
  clink:String,
  status:{
    type:Boolean,
    dafault:false
  }
});


// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.post('save', async function(user,next) {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
    }
  });
  let date=new Date();
  let mail={
    "id":user._id,
    "created":date.toString()
  }
  const token_mail_verification=jwt.sign(mail,process.env.SECRET_KEY,{
    expiresIn:'1d'
  })
  let url="https://helping-verb.herokuapp.com/" + "verify?id=" +token_mail_verification;
  let info = await mailTransporter.sendMail({
    from: '"Helping-Verb" helpingverb19@gmail.com', 
    to: user.email, 
    subject: "Account Verification",
    html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+url+">Click here to verify</a>"  , 
    }, (error, info) => {

    if (error) {
        console.log(error)
        return;
    }
    console.log('Message sent successfully!');
    console.log(info);
    transporter.close();
});
  next();
  });
// static method to login user
userSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      if(user.status==false)
      {
        throw Error ('email is not verified')
      }
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect username');
};

// exporting this models
const User = mongoose.model('user', userSchema);

module.exports = User;
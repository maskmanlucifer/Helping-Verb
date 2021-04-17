// import model
const User = require("../models/User");
const Project = require("../models/Project");
require('dotenv').config();
// include jwt
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

// include nodemailer
const nodemailer = require('nodemailer');

// all tech stacks
let techs=['java','mysql','angularjs','php','reactjs','graphql','c++','hadoop','ds','algo','linux','js','html',
'css','git','python','go','node.js','mongodb','ejs','flutter','babel','express','firebase','vue.js','typescript','jwt','heroku','aws s3','bash','flask','django','auth0'];
techs.sort();

// handle errors
const handleErrors = (err) => {
  
  let errors = { email: '', password: '',username:'' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }
  
  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  if (err.message === 'email is not verified') {
    errors.email = 'a verfictaion mail has been sent to your email, please verify your email first';
  }

  if (err.message === 'incorrect username') {
    errors.username= 'That username is not registered';
  }
  // duplicate email error can be only catched with codes
  if (err.code === 11000) {
    if(err.keyValue.email)
    {
    errors.email = 'that email is already registered';
    }
    else if(err.keyValue.username){
      errors.username="that username is already registered";
    }
    else 
    {
      errors.email = 'that email is already registered';
      errors.username="that username is already registered";
    }
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // traversing through array of errors and taking property object to  extract errors
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = async (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.recover_get = (req, res) => {
  res.render('recover');
}


// this is a async function because  create will retuen a promise
module.exports.signup_post = async (req, res) => {
  // extracting email and password from request body
  let newUser={
    name:"Bot",
    email:req.body.email,
    password:req.body.password,
    username:req.body.username,
    skills:[],
    interns:[],
    jobs:[],
    batch:2025,
    glink:"",
    clink:"",
    status:false
  };

  const { email, password,username } = req.body;
  
  // try catch method for try something and in case of failing dealing with err
  try {
    // saving data to database 
    const user = await User.create(newUser);

    const token = createToken(user._id);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    // sending back user id 
    res.status(201).json({ user: user._id });

  }
  catch(err) 
  {
  
    const errors = handleErrors(err);

    // sending errors back to be showed on front end
    res.status(400).json({ errors });
    
  }
 
}

// async function beacuse of login 
module.exports.login_post = async (req, res) => {
  // extracting email and password from request body
  const { username, password } = req.body;
  
  // try catch method for try something and in case of failing dealing with err
  try {
    // static login of user
    const user = await User.login(username, password);
    const token = createToken(user._id);

    // generating cookie 
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    // sending back user id
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    // firing handleerrors function for dealing with errors
    console.log(err.message);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  // creating temporary cookie with extremely short time span
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports.verify_get=(req,res)=>{
  let token = req.query.id;
    if (token) {
        try {
            jwt.verify(token, process.env.SECRET_KEY, (e, decoded) => {
                if (e) {
                    console.log(e)
                    return res.sendStatus(403)
                } else {
                    let id = String(decoded.id);
                    User.findOneAndUpdate({"_id": id}, {$set: {"status": true}},  function(err,doc) {
                      if (err) { throw err; }
                      else { console.log("Updated"); }
                    });
                    
                    res.render('login');
                }
            });
        } catch (err) {

            console.log(err)
            return res.sendStatus(403)
        }
    } else {
        return res.sendStatus(403)

    }
}

module.exports.recover_post = async (req, res) => {
  // extracting email and password from request body
  const { username } = req.body;
  
  // try catch method for try something and in case of failing dealing with err
  try {
    // static login of user
    let user=await User.find({username:username}); 
    console.log(user.length);
    if(user.length== 0)
    {
      let errors = { username:'' };
      
      errors.username= 'That username is not registered';
      
      res.status(400).json({ errors });
    }
    else
    {
      
      let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
      });
      let date=new Date();
      let mail={
        "id":user[0]._id,
        "created":date.toString()
      }
      const token_mail_verification=jwt.sign(mail,process.env.SECRET_KEY,{
        expiresIn:'1d'
      })
      let url="https://helping-verb.herokuapp.com/" + "changepassword?id=" +token_mail_verification;
      let info = await mailTransporter.sendMail({
        from: '"Helping-Verb" helpingverb19@gmail.com', 
        to: user[0].email, 
        subject: "Password change link",
        html: "Hello,<br> Please Click on the link to change your password.<br><a href="+url+">Click here to verify</a>"  , 
        }, (error, info) => {
    
        if (error) {
            console.log(error)
            return;
        }
        console.log('Message sent successfully!');
        console.log(info);
        transporter.close();
    });
      res.status(200).json({ user: user[0]._id });
    }
  } 
  catch (err) {
    
    console.log(err.message);
    
  }

}

module.exports.changepassword_get=(req,res)=>{
  let token = req.query.id;
    if (token) {
        try {
            jwt.verify(token, process.env.SECRET_KEY,async (e, decoded) => {
                if (e) {
                    console.log(e)
                    return res.sendStatus(403)
                } else {
                    let id = String(decoded.id);
                    const token = createToken(id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    let user=await User.findById(id);
                    res.render('profile',{data:user,techs:techs,user: user._id});
                }
            });
        } catch (err) {

            console.log(err)
            return res.sendStatus(403)
        }
    } else {
        return res.sendStatus(403)
    }
}

// import model
const User = require("../models/User");
require('dotenv').config();
// include jwt
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let curr=2024;
let techs=['java','mysql','angularjs','php','reactjs','graphql','c++','hadoop','ds','algo','linux','js','html',
'css','git','python','go','node.js','mongodb','ejs','flutter','babel','express','firebase','vue.js','typescript','jwt','heroku','aws s3','bash','flask','django','auth0'];
techs.sort();

module.exports.get_profile = async (req, res) => {
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
          let user = await User.findById(decodedToken.id);
          res.render('profile',{data:user,techs:techs});
      });
}

module.exports.namechange = async (req, res) => {
    
    let { newname } = req.body;
    newname=newname.toLowerCase();
    newname=newname[0].toUpperCase()+newname.slice(1);
    // try catch method for try something and in case of failing dealing with err
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
              
              await User.findOneAndUpdate({ _id: decodedToken.id},{ $set: { "name" : newname }});
              
              res.status(201).json({ user: decodedToken.id });
          });
    }
    catch(err) {
      console.log(err);
      
    }
   
  }

  module.exports.batchchange = async (req, res) => {
    
    const { newbatch } = req.body;
    
    // try catch method for try something and in case of failing dealing with err
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
              
              await User.findOneAndUpdate({ _id: decodedToken.id},{ $set: { "batch" : newbatch }});
              
              res.status(201).json({ user: decodedToken.id });
          });
    }
    catch(err) {
      console.log(err);
      
    }
   
  }

  module.exports.skillschange = async (req, res) => {
    
    const { newskills } = req.body;
    
    // try catch method for try something and in case of failing dealing with err
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
              const mySet=new Set()
              let user=await  User.findById(decodedToken.id);
              for(let i=0;i<user.skills.length;i++)
              {
                mySet.add(user.skills[i]);
              }
              let arr1=Array.from(newskills);
              for(let i=0;i<arr1.length;i++)
              {
                mySet.add(arr1[i]);
              }
              let arr = Array.from(mySet);
              await User.findOneAndUpdate({ _id: decodedToken.id},{ $set: { "skills" : arr }});
              
              res.status(201).json({ user: decodedToken.id });
          });
    }
    catch(err) {
      console.log(err);
      
    }
   
  }

  module.exports.addjob= async (req, res) => {
    
    let { njob } = req.body;
    njob=njob.toLowerCase();
    njob=njob[0].toUpperCase()+njob.slice(1);
    // try catch method for try something and in case of failing dealing with err
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
              const mySet=new Set()
              let user=await  User.findById(decodedToken.id);
              for(let i=0;i<user.jobs.length;i++)
              {
                mySet.add(user.jobs[i]);
              }
              
              if(njob.length)
              {
               mySet.add(njob);
              }
              let arr = Array.from(mySet);
              await User.findOneAndUpdate({ _id: decodedToken.id},{ $set: { "jobs" : arr }});
              
              res.status(201).json({ user: decodedToken.id });
          });
    }
    catch(err) {
      console.log(err);
      
    }
   
  }

  module.exports.addintern= async (req, res) => {
    
    let { nintern } = req.body;
    nintern=nintern.toLowerCase();
    nintern=nintern[0].toUpperCase()+nintern.slice(1);
    // try catch method for try something and in case of failing dealing with err
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
              const mySet=new Set()
              let user=await  User.findById(decodedToken.id);
              for(let i=0;i<user.interns.length;i++)
              {
                mySet.add(user.interns[i]);
              }
              
              if(nintern.length)
              {
               mySet.add(nintern);
              }
              let arr = Array.from(mySet);
              await User.findOneAndUpdate({ _id: decodedToken.id},{ $set: { "interns" : arr }});
              
              res.status(201).json({ user: decodedToken.id });
          });
    }
    catch(err) {
      console.log(err);
      
    }
   
  }

  module.exports.deletejob= async (req, res) => {
    
    let { njob } = req.body;
    njob=njob.toLowerCase();
    njob=njob[0].toUpperCase()+njob.slice(1);
    // try catch method for try something and in case of failing dealing with err
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
              const mySet=new Set()
              let user=await  User.findById(decodedToken.id);
              for(let i=0;i<user.jobs.length;i++)
              {
                mySet.add(user.jobs[i]);
              }
              
              if(njob.length)
              {
               mySet.delete(njob);
              }
              let arr = Array.from(mySet);
              await User.findOneAndUpdate({ _id: decodedToken.id},{ $set: { "jobs" : arr }});
              
              res.status(201).json({ user: decodedToken.id });
          });
    }
    catch(err) {
      console.log(err);
      
    }
   
  }

  module.exports.deleteintern= async (req, res) => {
    
    let { nintern } = req.body;
    nintern=nintern.toLowerCase();
    nintern=nintern[0].toUpperCase()+nintern.slice(1);
    // try catch method for try something and in case of failing dealing with err
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
              const mySet=new Set()
              let user=await  User.findById(decodedToken.id);
              for(let i=0;i<user.interns.length;i++)
              {
                mySet.add(user.interns[i]);
              }
              
              if(nintern.length)
              {
               mySet.delete(nintern);
              }
              let arr = Array.from(mySet);
              await User.findOneAndUpdate({ _id: decodedToken.id},{ $set: { "interns" : arr }});
              
              res.status(201).json({ user: decodedToken.id });
          });
    }
    catch(err) {
      console.log(err);
      
    }
   
  }

  module.exports.glinkchange = async (req, res) => {
    
    const { newglink } = req.body;
    
    // try catch method for try something and in case of failing dealing with err
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
              
              await User.findOneAndUpdate({ _id: decodedToken.id},{ $set: { "glink" : newglink }});
              
              res.status(201).json({ user: decodedToken.id });
          });
    }
    catch(err) {
      console.log(err);
      
    }
   
  }

  module.exports.clinkchange = async (req, res) => {
    
    const { newclink } = req.body;
    
    // try catch method for try something and in case of failing dealing with err
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
              
              await User.findOneAndUpdate({ _id: decodedToken.id},{ $set: { "clink" : newclink }});
              
              res.status(201).json({ user: decodedToken.id });
          });
    }
    catch(err) {
      console.log(err);
      
    }
   
  }

  module.exports.changepassword = async (req, res) => {
    
    let newpassword = req.body.newpassword;
    const salt = await bcrypt.genSalt();
    newpassword = await bcrypt.hash(newpassword, salt);
    // try catch method for try something and in case of failing dealing with err
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
              
              await User.findOneAndUpdate({ _id: decodedToken.id},{ $set: { "password" : newpassword }});
              
              res.status(201).json({ user: decodedToken.id });
          });
    }
    catch(err) {
      console.log(err);
      
    }
   
  }

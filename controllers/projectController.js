// import model
const Project = require("../models/Project");
require('dotenv').config();
const User = require("../models/User");

let techs=['java','mysql','angularjs','php','reactjs','graphql','c++','hadoop','ds','algo','linux','js','html',
'css','git','python','go','node.js','mongodb','ejs','flutter','babel','express','firebase','vue.js','typescript','jwt','heroku','aws s3','bash','flask','django','auth0'];
techs.sort();

// include jwt
const jwt = require('jsonwebtoken');
const { json } = require("body-parser");
const handleErrors = (err) => {
    let errors = { pname: '' };
    
    if (err.code === 11000) {
      if(err.keyValue.pname)
      {
      errors.pname = 'that project name already exist';
      }
      return errors;
    }
    return errors;
}
  
module.exports.get_project = async (req, res) => {
    const user = await Project.find({}).sort( { pdate: -1 });
    res.render('project',{data:user,common:1,onbranch:1});
}

module.exports.get_my_project = async (req, res) => {
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
          let user = await User.findById(decodedToken.id);
          const data= await Project.find({pusername:user.username}).sort( { pdate: -1 });
          res.render('project',{data:data,common:1,onbranch:2});
      });
    
}

module.exports.post_add_my_project = async (req, res) => {
    const token = req.cookies.jwt;
    let date=new Date();
    let date1=Number(date.getFullYear());
    let nintern=req.body.pname;
    nintern=nintern.toLowerCase();
    nintern=nintern[0].toUpperCase()+nintern.slice(1);
    let newProject={
        pname:nintern,
        pdate:date1,
        pdes:req.body.pdes,
        plink:req.body.plink,
        powner:req.body.powner,
        pstack:[],
        pusername:""
    };
    for(let i=0;i<req.body.pstack.length;i++)
    {
        newProject.pstack.push(String(req.body.pstack[i]));
    }
    let newtoken=0;
    jwt.verify(token,process.env.SECRET_KEY,(err, decodedToken) => {
        newtoken=decodedToken.id;
    });
    let user=await User.findById(newtoken);
    newProject.pusername=user.username;
    try{
        
        const project = await Project.create(newProject);
         res.status(201).json({ user: user._id });
   }
   catch (err) 
   { 
        
        const errors = handleErrors(err);
        res.status(400).json({ errors });
   }
}

module.exports.get_add_my_project = (req, res) => {
    res.render('addproject',{techs:techs});
}

module.exports.post_delete_my_project = async (req, res) => {
    const {pname,pusername}=req.body;
    console.log({pname,pusername});
    try{
        
        await Project.deleteOne({pname:pname,pusername:pusername});
        let user=await User.find({username:pusername});
        res.status(201).json({user:user._id});
   }
   catch (err) 
   { 
        console.log(err);
   }
}

module.exports.filter= async(req, res) => {
    let num=Number(req.body.year);
    console.log(typeof(num));
    const project = await Project.find({pdate: num});
    res.render('project',{data:project,common:1,onbranch:1});
}

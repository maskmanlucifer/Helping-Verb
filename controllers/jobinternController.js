// import model
const User = require("../models/User");

// include jwt
const jwt = require('jsonwebtoken');

let curr=2024; 

module.exports.job = async (req, res) => {
    const user = await User.find({'jobs.0': {$exists: true}}).sort( { batch: -1 } );
    res.render('jobintern',{data:user,page:"job"});
}

module.exports.intern = async (req, res) => {
    const user = await User.find({'interns.0': {$exists: true}}).sort( { batch: -1 } );
    res.render('jobintern',{data:user,page:"intern"});
}

module.exports.filter= async(req, res) => {
    console.log(req.body);
    const user = await User.find({batch: req.body.batch });
    console.log(user);
    res.render('jobintern',{data:user,page:req.body.type});
}

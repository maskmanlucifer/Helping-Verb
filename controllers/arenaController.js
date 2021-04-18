// import model
const User = require("../models/User");

// include jwt
const jwt = require('jsonwebtoken');

let curr=2024;

module.exports.arena_1_get = async (req, res) => {
    const user = await User.find({ batch:curr,status:true ,name: {$ne: "Bot"}});
    res.render('arena_1',{data:user,arenaName:"Newbies"});
}

module.exports.arena_2_get = async (req, res) => {
    const user = await User.find({ batch:curr-1 ,status:true,name: {$ne: "Bot"}});
    res.render('arena_1',{data:user,arenaName:"Specialists"});
}

module.exports.arena_3_get = async (req, res) => {
    const user = await User.find({ batch:curr-2 ,status:true,name: {$ne: "Bot"}});
    res.render('arena_1',{data:user,arenaName:"Experts"});
}

module.exports.arena_4_get = async (req, res) => {
    const user = await User.find({ batch:curr-3, status:true ,name: {$ne: "Bot"}});
    res.render('arena_1',{data:user,arenaName:"Masters"});
}

module.exports.arena_5_get = async (req, res) => {
    const user = await User.find({ batch : { $lte: curr-4 } ,status:true,name: {$ne: "Bot"}});
    res.render('arena_5',{data:user,arenaName:"Grand masters"});
}

module.exports.filter= async(req, res) => {
    let batch=curr-4;
    batch=Math.min(batch,Number(req.body.batch));
    const user = await User.find({batch: batch,status:true,name: {$ne: "Bot"} });
    res.render('arena_5',{data:user,arenaName:"Grand masters"});
    
}

// include mongoose
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  pusername:{
    type: String,
    lowercase: true,
  },
  pname:{
      type:String,
      unique:true,
      lowercase:true,
  },
  powner:{
      type:String,
  },
  plink:{
      type:String 
  },
  pdate:{
      type:Number 
  },
  pdes:{
      type:String 
  },
  pstack:{
      type:Array,
      lowercase:true
  }
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
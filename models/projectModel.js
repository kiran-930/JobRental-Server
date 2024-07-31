const mongoose =require('mongoose')

const projectSchema = new mongoose.Schema({
  title :{
    type:String,
    required:true
  },
  category :{
    type:String,
    required:true
  },
  overview :{
    type:String,
    required:true
  },
  video :{
    type:String,
    required:true
  },
  website :{
    type:String,
    required:true
  },
  projectImg :{
    type:String,
    required:true
  },
  userId :{
    type:String,
    required:true
  }
})

const projects = mongoose.model("projects", projectSchema)

module.exports = projects
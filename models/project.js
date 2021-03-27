const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema ({
name:String,
description:String,
lead:String,
tasks:[String]


})


module.exports=mongoose.model("Project",projectSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema ({
name:String,
description:String,
lead:mongoose.Schema.Types.ObjectId,
finished:Boolean
})


module.exports=mongoose.model("Project",projectSchema)
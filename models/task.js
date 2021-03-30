const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
name:String,
description:String,
parent:mongoose.Schema.Types.ObjectId,
finished:Boolean

})


module.exports=mongoose.model("Task",taskSchema)
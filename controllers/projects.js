const Project = require('../models/project')



module.exports= {
    userProjects,
    All
}

function userProjects(req,res){

    console.log("Got to router")
res.render('projects/userProjects.ejs',{title:"User Projects",user:req.user})

}

function All(req,res){
    console.log("Got to router")
    res.render('projects/allProjects',{title:"All Projects",user:req.user})

}
const Project = require('../models/project')
const User = require('../models/user')

module.exports= {
    userProjects,
    All,
    New:newProjectPage,
    Create
}
function Create(req,res)
{
    Project.create(req.body).then(project=>{
        res.redirect()
    })
}
function newProjectPage (req,res){

    res.render('projects/new',{title:"New Project",user:req.user})
}
function userProjects(req,res){

Project.find({lead:req.user._id})
    .then((projects)=>
    {
       
        res.render('projects/userProjects.ejs',{title:"User Projects",user:req.user,projects})
        
    })




}

function All(req,res){
    
    Project.find({})
    .then((projects)=>
    {
       
        res.render('projects/userProjects.ejs',{title:"User Projects",user:req.user,projects})
        
    })



}
const Project = require('../models/project')
const User = require('../models/user')

module.exports= {
    userProjects,
    All,
    New:newProjectPage,
    createProject,
    Show
}

function Show(req,res)
{
    console.log(req._id)
    Project.findById(req._id)
    .then(project=>{
        res.render('projects/show',{title:"Show",project,user:req.user})
    })
   
}

function createProject(req,res)
{
    Project.create(req.body)
    .then
    (   project=>{
        project.save((err,project)=>
        {
            console.log("We saving up in hurr")
            res.render('projects/show',{title:"Show",project,user:req.user})
        })
    })
}

function newProjectPage (req,res)
{
    Project.create(req.body).then(project=>
        {
            res.render('projects/new',{title:"New Project",user:req.user})
        })
}

function userProjects(req,res)
{
    Project.find({lead:req.user._id})
    .then((projects)=>
    {
        res.render('projects/userProjects',{title:"User Projects",user:req.user,projects})
    })
}

function All(req,res){
    
    Project.find({})
    .then((projects)=>
    {
       
        res.render('projects/allProjects',{title:"All Projects",user:req.user,projects})
        
    })



}
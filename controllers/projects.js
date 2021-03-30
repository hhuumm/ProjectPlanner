    const Project = require('../models/project')
    const User = require('../models/user')
    const Task = require('../models/task')

module.exports= {
    userProjects,
    All,
    New:newProjectPage,
    createProject,
    Show
}

function Show(req,res)
{
    console.log(req.params)
    Project.findById(req.params.ID)
    .then(project=>{
        Task.find({parent:req.params.ID}).then(tasks=>
        {
            res.render('projects/show',{title:"Show",project,ID:req.params.ID,user:req.user,tasks})
        })
    })
   
}

function createProject(req,res)
{
    if(req.body.lead)
    {
        req.body.lead=req.user._id
    }
    Project.create(req.body)
    .then
    (   project=>{
        project.save((err,project)=>
        {
            console.log("We saving up in hurr")
            res.render('projects/show',{title:"Show",project,tasks:project.tasks,user:req.user})
            
        })
        
    })
}

function newProjectPage (req,res)
{
     res.render('projects/new',{title:"New Project",user:req.user}) 
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
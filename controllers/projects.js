    const Project = require('../models/project')
    const User = require('../models/user')
    const Task = require('../models/task')

module.exports= {
    userProjects,
    All,
    New:newProjectPage,
    createProject,
    Show,
    Delete:deleteProject
}

function deleteProject(req,res)
{
    Project.findByIdAndDelete(req.params.ID)
    .then
    (
        ()=>
        {
            res.redirect('/projects/')
        }
    )

}

function Show(req,res)
{
    //Check and see if we have a project with this ID
   Task.count({_id:req.params.ID})
   .then
   (
        count=>
        {
            //If no project
            if(count>0)
            {   //Check and see if we have tasks with this ID
                //Go to task
                res.redirect(`/projects/task/${req.params.ID}`) 
                
            }

        }
   )
   .catch
   (
       err=>
        {
           console.log(err)
        }
   )
    
    Project.findById(req.params.ID)
    .then
    (
        project=>
        {
            Task.find({parent:req.params.ID})
            .then
            (
                tasks=>
                {
                    console.log(tasks)
                    if(tasks.length==0)
                    {

                        res.render('projects/show',{title:"Show",project,ID:req.params.ID,user:req.user,tasks:[]})
                    
                    }
                    else
                    {
                        
                        res.render('projects/show',{title:"Show",project,ID:req.params.ID,user:req.user,tasks})
                    }
                    
                }
            )
        }
    )


}   


function createProject(req,res)
{
    if(req.body.lead)
    {
        req.body.lead=req.user._id
        req.body.leadName=req.user.name
    }
    Project.create(req.body)
        .then
        (   (project)=>
            {
               res.redirect(`/projects/show/${project._id}`)
            }
        )
}


function newProjectPage (req,res)
{
     res.render('projects/new', {title:"New Project",user:req.user,tasks:[]}) 
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
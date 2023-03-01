    const Project = require('../models/project')
    const User = require('../models/user')
    const Task = require('../models/task')
    const taskController = require('../controllers/tasks')

module.exports= {
    userProjects,
    All,
    New:newProjectPage,
    createProject,
    Show,
    Delete:deleteProject,
    edit,
    update,
    signUp
}

function signUp(req,res)
{
    Project.findById(req.params.ID)
    .then
    (
        proj=>
        {
            proj.lead=req.user._id
            proj.leadName=req.user.name 
            Project.findByIdAndUpdate(proj._id,proj).
            then((proj)=>{res.redirect(`/projects/show/${proj._id}`)})
        }
    )
}

function update(req,res)
{
    
    if(req.body.lead)
    {
        req.body.lead=req.user._id
        req.body.leadName=req.user.name
    }
    else
    {
        req.body.lead=undefined
        req.body.leadName=""
    }
    Project.findByIdAndUpdate(req.params.ID,req.body)
    .then((project)=>
        {
            res.redirect(`/projects/show/${project._id}`)
    
        }
    )

}

function deleteProject(req,res)
{
    Project.findByIdAndDelete(req.params.ID)
    .then
    (
        (project)=>
        {
            Task.find({parent:project._id})
            .then
            (
                (tasks)=>
                {
                    tasks.forEach
                    (
                        task=>
                        {
                            taskController.deleteAll(task)
                            Task.findByIdAndDelete(task)
                            .then(()=>{})
                        }
                    )
                }
            )
            res.redirect(`/projects/${req.user._id}`)
        }
    )

}

function Show(req,res)
{
    //Check and see if we have a taskParent with this ID
   Task.count({_id:req.params.ID})
   .then
   (
        count=>
        {
            //If no parent
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

function edit(req,res)
{
    Project.findById(req.params.ID)
    .then
    (
        project=>
        {
            res.render('projects/edit',{title:"Edit", project, user:req.user})   
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
       console.log(req.user);
        res.render('projects/allProjects',{title:"All Projects",user:req.user,projects})
        
    })



}
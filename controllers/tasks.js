
const Task = require('../models/task')



module.exports=
{
    New:newTasks,
    createTask,
    Show,
    ShowAll,
    Delete:deleteTask,
    edit,
    update,
    deleteAll,
    userTask,
    signUp
}
function signUp(req,res)
{
    Task.findById(req.params.ID)
    .then
    (
        task=>
        {
            task.lead=req.user._id
            task.leadName=req.user.name 
            Task.findByIdAndUpdate(task._id,task).
            then((task)=>{res.redirect(`/projects/task/${task._id}`)})
        }
    )
}
function userTask(req,res)
{
    Task.find
    (
        {lead:req.user._id},(err,task)=>
        {    
            console.log(err)
            res.render('tasks/allTasks',{title:`${req.user.name}'s Tasks`,tasks:task,user:req.user})
        }
    )

}

function edit(req,res)
{
    Task.findById(req.params.ID)
    .then
    (
        task=>
        {
           
            res.render('tasks/edit',{title:"Edit", task, user:req.user})   
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
    console.log(req.body.finished)
    if(req.body.finished=="on")
    {
        req.body.finished=true;
    }
    else{req.body.finished=false;}
    Task.findByIdAndUpdate(req.params.ID,req.body)
    .then((task)=>
        {
            res.redirect(`/projects/task/${task._id}`)
    
        }
    )
}

function deleteTask(req,res)
{
   
    Task.findById(req.params.ID)
    .then
        (
            task=>
                {
                   deleteAll(task)
                    Task.findByIdAndDelete(task._id)
                    .then
                    (
                        ()=>
                        {
                            
                            res.redirect(`/projects/task`)

                        }
                    )
                }
            
        )
}

function deleteAll(task)
{
    Task.find({parent:task._id})
    .then
    (
        tasks=>
        {
            if(tasks.length>0)
            {
                tasks.forEach
                (
                    t=>
                    {
                        deleteAll(t)
                    }
                )
            }
        }
    )
    .then
    (
        ()=>
        {
            Task.deleteMany({parent:task._id})
            .then
            (
                ()=>
                {
                   
                 return;   
            
                }
            )
        }
    )
    

    
}

function ShowAll(req,res)
{
    Task.find
    (
        {},(err,task)=>
        {    
            console.log(err)
            res.render('tasks/allTasks',{title:"All Tasks",tasks:task,user:req.user})
        }
    )


}

function Show(req,res)
{
    console.log(req.params.ID,"\n^^^Object ID")
    Task.findById(req.params.ID)
    .then
    (
        task=>
        {
            Task.find({parent:req.params.ID})
            .then
            (
                tasks=>
                {
                    console.log(task)
                    res.render('tasks/show',{title:"Show",task,tasks,user:req.user})
                }
                
            )
        }
    )
}    

function createTask(req,res)
{
    let id = req.params.ID
    console.log(req.body.lead)
    if(req.body.lead){req.body.lead=req.user._id;req.body.leadName=req.user.name}
    req.body.finished=false;
//Find out if the ID is for a task or project
    Task.create(req.body)
    .then(
        task=>
            {
                task.parent=id;
                task.finished=false;
                task.save
                (
                    (err)=>
                    {
                        console.log(err)  
                    }
                )
               
                res.redirect(`task/${task._id}`)
            }

    )
    
}

function newTasks(req,res)
{
    
    res.render('tasks/new',{title:"New Tasks",ID:req.params.ID,user:req.user}) 

}
const Project = require('../models/project')
const User = require('../models/user')
const Task = require('../models/task')


module.exports=
{
    New:newTasks,
    createTask,
    Show,
    ShowAll



}

function ShowAll(req,res)
{
    Task.find({},(err,task)=>
    {    
        console.log(err)
        res.render('tasks/allTasks',{title:"All Tasks",tasks:task,user:req.user})
    })

}




function Show(req,res){


}
function createTask(req,res)
{
    let id = req.params.ID
//Find out if the ID is for a task or project
    if(Task.findById(id)){console.log(id,"\nTaskInsideTask")}
    if(Project.findById(id)){console.log(id,"\nTask of Project")}
    console.log(id,"\nTHis is the ID of the object^^^")
    Task.create(req.body)
    .then(
        task=>
            {task.parent=id;
                console.log(task+"\n^^That is the New task")
                task.save((err)=>
                {
                   
                            try{
                                    Task.findById(id).tasks.push(task)
                                    res.redirect('tasks/show/'+id)
                                }
                            catch(err)
                                {
                                    console.log(err);
                                    try{

                                        Project.findById(id).tasks.push(task)
                                        res.redirect('projects/show/'+id)
                                    }catch(err){
                                        console.log(err)
                                        res.redirect('/')}

                                    }
                    
                        
                })

            }
        )
   
}

function newTasks(req,res)
{
    
    res.render('tasks/new',{title:"New Tasks",ID:req.params.ID,user:req.user}) 

}
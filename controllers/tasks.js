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




function Show(req,res)
{
    console.log(req.params.ID,"\n^^^Object ID")
    Task.findById(req.params.ID).then(task=>{

        res.render('tasks/show',{title:"Show",task,user:req.user})

    })
            
}
function createTask(req,res)
{
    let id = req.params.ID
//Find out if the ID is for a task or project
  
    
    Task.create(req.body)
    .then(
        task=>
            {task.parent=id;
              
                task.save((err)=>
                {
                   console.log(err)
                           
                        
                })

            }
        )

        try
            {
                                    
                res.render('tasks/show',{title:'show',task,user:req.user})
            }
        catch(err)
            {
                console.log(err);
                try
                {

                    const project = Project.findById(id)
                    res.redirect('projects/show',{title:"Project Show",project})
                }
                catch(err)
                {
                    console.log(err)
                    res.redirect('/')
                }

            }

   
}

function newTasks(req,res)
{
    
    res.render('tasks/new',{title:"New Tasks",ID:req.params.ID,user:req.user}) 

}
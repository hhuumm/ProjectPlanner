const Project = require('../models/project')



module.exports= {
    userProjects,
    All
}

function userProjects(req,res){

//   Project.findById(req.user._id)
//   .then(projects=>{
      
// })

console.log(req.user)

res.render('projects/userProjects.ejs',{title:"User Projects",user:req.user})

}

function All(req,res){
    
    res.render('projects/allProjects',{title:"All Projects",user:req.user})

}
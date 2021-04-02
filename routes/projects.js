const router = require("express").Router();
const projectController=require('../controllers/projects')
const taskController = require('../controllers/tasks')

//Im sorry future teammate, it wont happen again
router.get('/show/:ID',isLoggedIn, projectController.Show)
router.get('/task/user/:ID',isLoggedIn,taskController.userTask)
router.get('/edit/:ID',isLoggedIn, projectController.edit)
router.get('/task',isLoggedIn,taskController.ShowAll)
router.get('/task/:ID',isLoggedIn,taskController.Show)
router.get('/:ID/new',isLoggedIn,taskController.New)
router.get('/new',isLoggedIn, projectController.New)
router.get('/:ID',isLoggedIn,projectController.userProjects)
router.get('/',isLoggedIn,projectController.All)
router.get('/task/:ID/edit',isLoggedIn,taskController.edit)
router.post('/',isLoggedIn, projectController.createProject)
router.post('/:ID',isLoggedIn,taskController.createTask)
router.get('/:ID/signUp',projectController.signUp)
router.get('/:ID/taskSignUp',taskController.signUp)
router.put('/project/:ID',isLoggedIn,projectController.update)
router.put('/task/:ID',isLoggedIn,taskController.update)
router.delete('/:ID',isLoggedIn,projectController.Delete)
router.delete('/task/:ID',isLoggedIn,taskController.Delete)




function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }
  
module.exports = router;
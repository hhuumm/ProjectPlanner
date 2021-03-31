const router = require("express").Router();
const projectController=require('../controllers/projects')
const taskController = require('../controllers/tasks')

router.get('/show/:ID', projectController.Show)
router.get('/task',taskController.ShowAll)
router.get('/task/:ID',taskController.Show)
router.get('/:ID/new',taskController.New)
router.get('/new', projectController.New)
router.get('/:ID',projectController.userProjects)
router.get('/',projectController.All)
router.post('/', projectController.createProject)
router.post('/:ID',taskController.createTask)
router.delete('/:ID',projectController.Delete)
router.delete('/task/:ID',taskController.Delete)





function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }
  
module.exports = router;
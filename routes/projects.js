const router = require("express").Router();
const projectController=require('../controllers/projects')

router.get('/:ID',projectController.userProjects)
router.get('/',projectController.All)

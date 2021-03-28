const router = require("express").Router();
const projectController=require('../controllers/projects')

router.get('/:ID',projectController.userProjects)
router.get('/',projectController.All)




function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }
  
module.exports = router;
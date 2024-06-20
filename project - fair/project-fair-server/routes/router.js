const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')

const router = new express.Router()

//register - http://localhost:3000/register
router.post('/register',userController.registerController)
//login - http://localhost:3000/login
router.post('/login',userController.loginController)
//add project
router.post('/project/add',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectController)
// home project
router.get('/get-home-projects',projectController.getHomeProjects)
// all project
router.get('/all-projects',jwtMiddleware,projectController.allProjectsController)
// user-projects
router.get('/user-projects',jwtMiddleware,projectController.getuserProjectsController)
//edit project
router.put("/project/:pid/edit",jwtMiddleware,multerMiddleware.single('projectImg'),projectController.editProjectController);
// remove project
router.delete('/project/:pid/remove',jwtMiddleware,projectController.removeProjectController)
// edit project
router.put('/user/edit',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editProfileController)
module.exports = router
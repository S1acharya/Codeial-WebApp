const express = require('express');

const router = express.Router();
// to require router library

const homeController = require('../controllers/home_controller');
// we access controller to action

// console.log('router loaded');
// just to check in console that route is working 


router.get('/' , homeController.home);
// to access function of Home controller action in routes

router.use('/users' , require('./users'));
// index.js of router will have access to all other routes
// so this way we get access to other routes

module.exports = router;

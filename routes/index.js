const express = require('express');

const router = express.Router();
// to require router library

const homeController = require('../controllers/home_controller');
// we access controller to action

console.log('router loaded');
// just to check in console that route is working 


router.get('/' , homeController.home);
// to access function of controller action in routes

module.exports = router;

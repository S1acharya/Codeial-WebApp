const express = require('express');
const router = express.Router();

// import passport
const passport = require('passport');

const usersController = require('../controllers/users_controller');

// router.get('/profile' , userController.profile);
// earlier above line was used  , now used next line ,which allows only signed in user to go to profile page
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

// route to map to usersController.update
router.post('/update/:id', passport.checkAuthentication, usersController.update);

// router to connect to userController.signUp
router.get('/sign-up', usersController.signUp);

// router to connect to userController.signIn
router.get('/sign-in', usersController.signIn);

// router to connect to userController.create
// this posts the data to database
router.post('/create', usersController.create);

// create route for create-session
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

// create route for destroy session
router.get('/sign-out', usersController.destroySession);

module.exports = router;
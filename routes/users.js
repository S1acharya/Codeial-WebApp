const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');

// import passport
const passport = require('passport');

router.get('/profile' , userController.profile);

// router to connect to userController.signUp
router.get('/sign-up' , userController.signUp);


// router to connect to userController.signIn
router.get('/sign-in' , userController.SignIn);

// router to connect to userController.create
// this posts the data to database
router.post('/create' , userController.create)

// create route for create-session
// use passport as a middleware to authenticate
router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) , userController.createSession);

module.exports = router;
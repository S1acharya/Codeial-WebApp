const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile' , userController.profile);

// router to connect to userController.signUp
router.get('/sign-up' , userController.signUp);


// router to connect to userController.signIn
router.get('/sign-in' , userController.SignIn);

// router to connect to userController.create
// this posts the data to database
router.post('/create' , userController.create)

module.exports = router;
const express = require('express');

const router = express.Router();

const passport = require('passport');

// import actions from posts_controller
const postsController = require('../controllers/posts_controller');

// router to connect to postsController.create
// this posts the data to database
router.post('/create', passport.checkAuthentication,  postsController.create);

// create a route to map to the action of DESTROY post and comments
router.get('/destroy/:id' ,passport.checkAuthentication , postsController.destroy);

module.exports = router;

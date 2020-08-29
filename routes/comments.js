const express = require('express');

const router = express.Router();

const passport = require('passport');

// import actions from posts_controller
const commentsController = require('../controllers/comments_controller');

// router to connect to postsController.create
// this posts the data to database
router.post('/create', passport.checkAuthentication,  commentsController.create);

// create route to map to action of deleting comment of post
router.get('/destroy/:id', passport.checkAuthentication , commentsController.destroy);

module.exports = router;

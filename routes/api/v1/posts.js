const express = require('express');

const router = express.Router();
// to require router library

// import passport
const passport = require('passport');

// connect this to action  of controller in posts_api
const postsApi = require("../../../controllers/api/v1/posts_api");

// router to show posts
router.get('/' , postsApi.index);

// router to delete post
router.delete('/:id' ,passport.authenticate('jwt' , {session: false}) , postsApi.destroy);

// exporting the router
module.exports = router;
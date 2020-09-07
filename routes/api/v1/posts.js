const express = require('express');

const router = express.Router();
// to require router library

// connect this to action  of controller in posts_api
const postsApi = require("../../../controllers/api/v1/posts_api");

// router to show posts
router.get('/' , postsApi.index);

// router to delete post
router.delete('/:id' , postsApi.destroy);

// exporting the router
module.exports = router;
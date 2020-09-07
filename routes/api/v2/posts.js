const express = require('express');

const router = express.Router();
// to require router library

// connect this to action  of controller in posts_api
const postsApi = require("../../../controllers/api/v2/posts_api");

// 
router.get('/' , postsApi.index);

// exporting the router
module.exports = router;
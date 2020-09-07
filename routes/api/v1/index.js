const express = require('express');

const router = express.Router();
// to require router library

// connecting the file posts.js of same version
router.use('/posts' , require('./posts'));

// exporting the router
module.exports = router;
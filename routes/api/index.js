const express = require('express');

const router = express.Router();
// to require router library

// connecting to index of v1
router.use('/v1' , require('./v1'));

// connecting to index of v2
router.use('/v2' , require('./v2'));

// exporting the router
module.exports = router;
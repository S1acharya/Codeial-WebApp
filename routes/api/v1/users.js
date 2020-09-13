const express = require('express');

const router = express.Router();
// to require router library

// require users_api controller action
const usersApi = require('../../../controllers/api/v1/users_api');

// connecting this file to users_api.js
router.post('/create-session' , usersApi.createSession);

// exporting the router
module.exports = router;
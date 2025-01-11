const express = require('express');
const router = express.Router(); 
const userController = require('../controller/userController');
const authenticate = require('../middleware/authenticate');

router.get("/profile", authenticate, userController.getUserProfileHandler);

module.exports = router;

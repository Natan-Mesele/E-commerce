const express = require('express');
const router = express.Router(); 
const userController = require('../controller/userController');
const authenticate = require('../middleware/authenticate');

router.get("/profile", authenticate, userController.getUserProfileHandler);
router.put("/profile", authenticate, userController.updateUserProfileHandler);
router.put("/change-password", authenticate, userController.changePasswordHandler);

module.exports = router;

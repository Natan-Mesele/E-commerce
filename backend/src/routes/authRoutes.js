const express = require('express');
const router = express.Router();
const authController = require("../controller/authController");
const User = require('../models/usermodel');

router.post("/signup", authController.register)
router.post("/signin", authController.login)
router.post('/google', authController.googleSignUp);

module.exports = router;
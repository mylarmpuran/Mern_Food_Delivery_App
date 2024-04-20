const express = require('express');
const getUserProfileHandler = require('../controllers/userController.js');
const authenticate = require('../middleware/authenticate.js')
const router = express.Router();

router.get('/profile',authenticate,getUserProfileHandler);
console.log(typeof getUserProfileHandler)

module.exports = router;
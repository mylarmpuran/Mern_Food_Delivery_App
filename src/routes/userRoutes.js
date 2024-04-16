const express = require('express');
const userController = require ('../controllers/userController.js');
const authenticate = require('../middleware/authenticate.js')
const router = express.Router();

router.get('/profile', authenticate, userController.getUserProfileHandler);

module.exports = router;
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');
const authenticate = require('../middleware/authenticate.js');


router.get('/restuarant/:id',authenticate,categoryController.getRestaurantsCategory);

module.exports = router;
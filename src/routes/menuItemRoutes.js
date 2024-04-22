const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController.js')
const authenticate = require('../middleware/authenticate.js');

router.get('/search',authenticate, foodController.searchFood);
router.get('/restaurant/:restaurantId',authenticate,foodController.getMenuItemByRestaurantId);

module.exports = router;
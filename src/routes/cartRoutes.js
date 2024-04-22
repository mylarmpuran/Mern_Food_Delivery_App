const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController.js');
const authenticate = require('../middleware/authenticate.js');


router.put('/add',authenticate, cartController.addItemToCart);
router.get('/total',authenticate,cartController.calculateCartTotals);
router.get('',authenticate,cartController.findUserCart);
router.get('/clear',authenticate,cartController.clearCart);

module.exports = router;
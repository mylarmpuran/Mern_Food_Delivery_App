const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController.js');
const authenticate = require('../middleware/authenticate');


router.delete('/:orderId', authenticate, OrderController.deleteOrder);
router.get('/restaurant/:restaurantId',authenticate,OrderController.getAllRestaurantOrders)
router.put('/:orderId/:orderStatus',authenticate,OrderController.updateOrder);


module.exports = router;
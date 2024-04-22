const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientController.js');
const authenticate = require('../middleware/authenticate.js');

router.post('/category', authenticate, ingredientsController.createIngredientsCategory);
router.post('',authenticate,ingredientsController.createIngredient);
router.put('/:id/stoke',authenticate,ingredientsController.updateStoke);
router.get('/restaurant/:id',authenticate,ingredientsController.restaurantIngredients);
router.get('/restaurant/:id/category',authenticate, ingredientsController.restaurantIngredients);

module.exports = router;
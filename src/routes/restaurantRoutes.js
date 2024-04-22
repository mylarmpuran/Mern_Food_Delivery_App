const express=require('express');
const restaurantController=require('../controllers/restaurantController');
const authenticate = require('../middleware/authenticate.js')
const router=express.Router();


router.get('/search',restaurantController.findRestaurantByName);
router.get('/',restaurantController.getAllRestaurants);
router.get('/:id',restaurantController.findRestaurantByUserId);
router.get('/:id/add-favorites',authenticate,restaurantController.addToFavorite)


module.exports=router;
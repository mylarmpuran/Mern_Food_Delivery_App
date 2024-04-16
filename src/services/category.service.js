const Category = require('../models/categroty.model.js');
const Restaurant = require("../models/restaurant.model.js");


const createCategory = async(name, userId) => {
    try {
        const restaurant = await Restaurant.findOne({ owner: userId});
        if(!restaurant){
            throw new Error('Restaurant not found for user ID ${userID');
        }

        const createdCategory = new Category({ name, restaurant: restaurant._id });
        await createdCategory.save();
        return createdCategory;
    } catch (error) {
        throw new Error(`Failed to create category: ${error.message}`);
    }
}

const findCategoryByRestaurnatId = async(restaurantId) => {
    try {
        const categories = await Category.find({ restaurant: restaurantId});
        return categories;
    } catch (error) {
        throw new Error(`Failed to find categories for restaurant ID ${restaurantId}`)
    }
}

const findCategoryById =async(categoryId) => {
    try{
        const category = await Category.findById(categoryId);
        if(!category){
            throw new Error(`Category not found with ID ${categoryId}`);
        }
        return category;
    }catch (error) {
        throw new Error(`Failed to find categories for restaurant ID ${categoryId}`)
    }
}


module.exports = {createCategory, findCategoryByRestaurantId, findCategoryById}
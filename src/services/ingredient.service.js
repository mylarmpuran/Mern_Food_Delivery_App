const IngredientCategory = require("../models/ingredientCategory.model.js");
const IngredientsItem = require('../models/ingredientItem.model.js');
const Restaurant = require('../models/restaurant.model.js');


const createIngredientsCategory = async(name, restaurantId) => {
    try{
        let category = await IngredientCategory.findOne({
            restaurant: restaurantId,
            name: name,
        });

        if (category){
            return category;
        }

        const restaurant = await Restaurant.findById(restaurantId);
        if(!restaurant){
            throw new Error(`Restaurant not found with Id ${restaurantId}`);
        }

        category = new IngredientCategory({
            name: name,
            restaurant: restaurantId,
        })
        const createdCategory = await category.save();
        return createdCategory;
    }catch (error){
        throw new Error(
        `Failed to create ingredients category: ${error.message}`
    );
}
}

const findIngredientsCategorById = async(id) => {
   try {
        const category = await IngredientCategory.findById(id);
        if(!category){
            throw new Error(`Ingredient category not found with ID ${id}`);
        }
        return category;

   } catch (error) {
        throw new Error(
            `Failed to find ingredient category with ID ${id}: ${error.message}`
        );
   }
}

const findIngredientsCategoryByRestaurantId = async(restaurantId) => {
    try {
        const categoried = await IngredientCategory.find({
            restaurant: restaurantId,
        });
        return categories;
    } catch (error) {
        throw new Error(
            `Failed to find ingredients categories for restaurant with ID ${restaurantId}`
        );
        
    }
}

const findRestaurantsIngredients = async(restaurantId) => {
    try {
        const items = await IngredientsItem.find({
            restaurant: restaurantId,
            }).populate("category");
            return items;
    } catch (error) {
        throw new Error(
            `Failed to find ingredients for restaurant with ID ${restaurantId}: ${error.message}`
        );
        
    }
}

const createIngredientsItem = async(restaurantId, ingredientName, ingredientCategoryId) => {
    try {
        const category = await this.findIngredientsCategorById(
            ingredientCategoryId
        );
        if(!category)
            throw new Error(
        'ingredien category not found with id' + ingredientCategoryId);

        let item = await IngredientsItem.findOne({
            restaurant: restaurantId,
            name: ingredientName,
            category: category._id,
        });
        if(item){
            return item;
        }
        const restaurant = await Restaurant.findById(restaurantId);
        if(!restaurant){
            throw new Error(`Restaurant not found with ID ${restaurantId}`);
        }

        item = new IngredientsItem({
            name: ingredientName,
            restaurant: restaurantId,
            category: category._id,
        });
        const savedItem = await item.save();
        category.ingredients.push(savedItem._id);
        await category.save();
        return savedItem;
    } catch (error) {
        throw new Error(`Failed to create ingredients item: ${error.message}`);
    }
}

const updateStoke = async(id) => {
    try {
        const item = await IngredientsItem.findById(id).populate("category");
        if(!item){
            throw new Error(`Ingredient not found with ID ${id}`);
        }
        item.inStoke = !item.inStoke;
        await item.save();
        return item;
    } catch (error) {
        throw new Error(
            `Failed to update ingredient stoke status with ID ${id}: ${error.message}`
        )
    }
}
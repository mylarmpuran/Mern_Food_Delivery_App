 const Food = require('../models/food.model.js')

 const createFood = async(req,restaurant) => {
    try {
        const food = new Food({
            foodCategory: req.category,
            creationDate: new Date(),
            description: req.description,
            images: req.images,
            name: req.name,
            price: req.price,
            isSeasonal: req.seasonal,
            isVegetarian: req.vegetarian,
            restaurant: restaurant._id,
            ingredients: req.ingredients,
        });
        await food.save();
        restaurant.foods.push(food._id);
        await restaurant.save();
        return food;
    } catch (error) {
        throw new Error(`Failed to create food:${error.message}`);
    }
 }

const  deleteFood =async(foodId) => {
    try {
        const food = await Food.findById(foodId);
        if(!food){
            throw new Error(`Food not found with ID ${foodId}`);
        }
        food.restaurant = null;
        await food.save();
        await Food.findByIdAndDelete(foodId);
    } catch (error) {
        throw new Error(
            `Failed to delete food with ID ${foodId}: ${error.message}`
        );
    }
}

const getRestaurantFood =async(restaurantId, vegetarian, nonveg, seasonal, foodCategory) => {
    try {
        let query = { restaurant: restaurantId};
        console.log(nonveg)
        if(vegetarian == 'true'){
            query.isVegetarian = true;
        }

        if(nonveg == 'true') query.vegetarian = false;
        if(seasonal == 'true') query.isSeasonal = true;
        if (foodCategory)query.foodCategory = foodCategory;

        const foods = await Food.find(query).populate([
            { path: "ingredients", populate: {path: "category", select:"name"}},
        "foodCategory",
        { path: "restuarant", select:"name_id"},
        ]);
        return foods;

    } catch (error) {
        throw new Error(`Failed to retrieve restaurant food: ${error.message}`);
    }
}

const searchFood = async(keyword) => {
    try {
        let query = {};
        if(keyword){
            query.$or = [
                {name: {$regex: keyword, $options:'i'}},
                {"foodCategory.name":{$regex: keyword, $options:'i'}},
            ];
        }

        const foods = await Food.find(query);
        return foods;
    } catch (error) {
        throw new Error(`Failed to search for food: ${error.message}`);
    }
}

const updateAvailibilityStatus = async(foodId) => {
    try {
        const food = await Food.findById(foodId).populate([
            {path:"ingredients", populate: {path: "category", select:'name'}},
            "foodCategory",
            { path: "restaurant", select:"name_id"},
        ]);
        if(!food){
            throw new Error(`Food not found with ID ${foodId}`);
        }
        food.available = !food.available;
        await food.save();
        return food;
    } catch (error) {
        throw new Error(
            `Failed to update availability status for food with ID ${foodId}:${error.message}`
        )
    }
}

const findFoodById = async(foodId){
    try{
        const food = await Food.findById(foodId);
        if(!food){
            throw new Error(`Food not found with ID ${foodId}`);
        }
        return food;
    } catch (error) {
        throw new Error(
            `Failed to find Food with Id ${foodId}: ${error.message}`
        );
    }
};

module.exports = { createFood, deleteFood, getRestaurantFood, searchFood, updateAvailibilityStatus, findFoodById}
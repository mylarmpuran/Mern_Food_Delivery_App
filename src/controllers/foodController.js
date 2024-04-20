const foodService = require('../services/food.service.js');
const restaurantService = require('../services/RestaurantService.js');
const userService = require('../services/user.service.js');

const searchFood = async(req,res)=> {
    try {
        const {name} = req.query;
        const menuItem = await foodService.searchFood(name);
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({error:"Internal server error"});
    }
}

const getMenuItemByRestaurantId = async(req, res) => {
    try{
        const { restaurantId } = req.params;
        const { vegetarian , seasonal, nonveg, food_category } = req.query;
        const menuItems = await foodService.getRestaurantsFood(
            restaurantId,
            vegetarian,
            nonveg,
            seasonal,
            food_category
        );
        res.status(200).json(menuItems);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
            
        } else {
            res.status(500).json({error: "Internal server error"});
        }
    }
}

const createItem = async(req,res) => {
    try {
        const item = req.body
        const user = req.user;
        const restaurant = await restaurantService.findRestaurantById(
            item.restaurantId
        );
        const menuItem = await foodService.createFood()
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else {
            res.status(500).json({error: "Internal server error"});
        }
    }
}

const deleteItem = async(req,res) => {
    try {
        const { id } = req.params;

        const user = req.user;
        await foodService.deleteFood(id);
        res.status(200).json({message: "Menu item deleted"});
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
    }else {
        res.status(500).json({error: "Internal server error"});
    }
}
}

const getMenuItemByName = async(req, res) => {
    try {
        const { name } = req.query;
        const menuItem = await foodService.searchFood(name);
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({error: "Internal server error "});
    }
}

const updateAvilibalityStatus = async(req, res) =>  {
    try {
        const { id } = req.params;
        const menuItem = await foodService.updateAvilibalityStatus(id);
        res.status(200).json(menuItem);
    }catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
    }else {
        res.status(500).json({error: "Internal server error"});
    }
}
}

model.exports = {searchFood,getMenuItemByRestaurantId,createItem,deleteItem,getMenuItemByName,updateAvilibalityStatus}
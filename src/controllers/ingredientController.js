const ingredientService = require("../services/ingredient.service.js");

const createIngredientsCategory = async(req, res) => {
    try {
        const { name, restaurantId } = req.body;
        const items = await ingredientService.createIngredientsCategory(
            name,
            restaurantId
        );
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "internal server error", message:error.message})
    }
}

const createIngredient = async(req, res) => {
    try{
        const { restaurantId, name, ingredientCategoryId } = req.body;
        console.log(req.body);
        const item = await ingredientService.createIngredientItem(
            restaurantId,
            name,
            ingredientCategoryId
        );
        return res.status(200).json(item);
    }catch(error){
       res.status(500).json({ error: "internal server error", message:error.message})
    }
}

const updateStoke = async(req, res) => {
    try {
        const {id} = req.params;
        const item = await ingredientService.udpateStoke(id);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
}


const restaurantIngredients = async(req, res) => {
    try {
        const { id } = req.params;
        const items = await ingredientService.findRestaurantsIngredients(id);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "internal server error "});
    }
}

const restaurantIngredientCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const items = 
        await ingredientService.findIngredientCategoryByRestaurantId(id);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

const ingredientService = require("../services/ingredient.service.js");

const createIngredientsCategory = async(req, res) => {
    try {
        const { name, restaurantId } = req.body;
        const items = await ingredientService.createIngredientsCategory(
            name,
            restaurantId
        );
        res.status
    } catch (error) {
        
    }
}
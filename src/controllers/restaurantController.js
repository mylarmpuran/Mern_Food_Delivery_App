const RestaurantService = require("../services/RestaurantService.js");
const userService = require("../services/userService.js");

const createRestaurant = async (req, res) => {
  try {
    const user = req.user;
    const restaurant = await RestaurantService.createRestaurant(req.body, user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { jwt } = req.body;
    const user = await userService.findUserProfileByjwt(jwt);
    await RestaurantService.deleteRestaurant(id);
    res.status(200).json({
      message: "Restaurant Deleted with Id successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "internal server error" });
    }
  }
};

const updateRestaurantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("restaurant id", id);
    const restaurant = await RestaurantService.updateRestaurantStatus(
      id.toString()
    );
    console.log("restuarnat id", id);
    res.status(200).json(restaurant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "internal server error" });
    }
  }
};

const findRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const restaurant = await RestaurantService.getRestaurantByUserId(user._id);
    res.status(200).json(restaurant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "internal server error" });
    }
  }
};

const findRestaurantByName = async (req, res) => {
  try {
    const { keyword } = req.query;
    const restaurants = await RestaurantService.searchRestaurant(keyword);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantService.getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addToFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const restaurant = await RestaurantService.addToFavorite(id, user);
    res.status(200).json(restaurant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "internal server error" });
    }
  }
};


module.exports = { createRestaurant,deleteRestaurant,updateRestaurantStatus,findRestaurantById,findRestaurantByName,getAllRestaurants,addToFavorite }
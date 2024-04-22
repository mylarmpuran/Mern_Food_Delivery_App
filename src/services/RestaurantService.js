const Restaurant = require('../models/restaurant.model.js')


const createRestaurant = async(req,user) => {
    try{
        const address=new address({
            city:req.address.city,
            country:req.address.country,
            fullName:req.address.fullName,
            postalCode:req.address.postalCode,
            state:req.address.state,
            streetAddress:req.address.streetAddress
        })

        const saveAddress = await address.save();

        const restaurant = new restaurant({
                address:saveAddress,
                contactInformation:req.contactInformation,
                cuisineType:req.cuisineType,
                description:req.description,
                images:req.images,
                name:req.name,
                openingHours:req.openingHours,
                registraitonDate:req.registraitonDate,
                owner:user
        })

        const saveRestaurant = await restaurant.save();
        return saveRestaurant;

    }catch (error){
        throw new Error(error.message);
    }
}

const findRestaurantById =async(restaurantId)=> {
    try{
        const restaurant=await Restaurant.findById(restaurantId);
        if(!restaurant) throw new Error("restaurant not found");
        return restaurant;
    }catch(error){
        throw new Error (error.message);
    }
};

const deleteRestaurantById= async (restaurantId) => {
    try {
        this.findRestaurantById(restaurantId);
        const restaurant=await Restaurant.deleteById(restaurantId);
    }catch(error){
        throw new Error(error.message);
    }
};

const getRestaurantByUserId = async(userId) => {
    try{
        const restaurant=await Restaurant.findOne({owner:userId}).populate("owner").populate('address');

        if(!restaurant){
            throw new Error("restaurant not found");
        }
        return restaurant;
        }catch (error){
            throw new Error(error.message)
    }
};


const searchRestaurant = async(keyword) => {
    try{
        const restaurants  = await Restaurant.find({
            $or:[
                {
                    name:{$regex:keyword, $options:'i'},
                    description:{$regex:keyword, $options:'i'}
                }
            ]
        });
        return restaurants;
    }catch (error){
        throw new Error(error.message)
}
};

const addToFavorite = async(restaurantId, user) => {
    try {
        const restaurant = this.findRestaurantById(restaurantId);

        const dto={
            _id:restaurant._id,
            title:restaurant.name,
            images:restaurant.images,
            description:restaurant.description
        }

        const favorites=user.favorites || [];
        const index=favorites.findIndex(favorites=>favorites._id===restaurantId);

        if(index!==-1){
            favorites.splice(index,1);
        }
        else{
            favorites.push(dto);
        }
        
        user.favorites = favorites;
        await user.save();
        return dto;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllRestaurants = async() =>{
    try{
        const restaurants=await Restaurant.find();
        return restaurants;
    }catch(error){
        throw new Error(error.message);
    }
};

const updateRestaurantStatus = async(id)=> { 
    try {
        const restaurant = await Restaurant.findById(id).populate("owner").populate("address");

        if(!restaurant){
            throw new Error("restaurant not found");
        }

        restaurant.open=!restaurant.open;
        await restaurant.save();
        return restaurant;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createRestaurant, findRestaurantById, deleteRestaurantById, getRestaurantByUserId, searchRestaurant, addToFavorite, getAllRestaurants, updateRestaurantStatus}
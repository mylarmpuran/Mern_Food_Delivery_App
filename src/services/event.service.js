const Events = require("../models/event.model.js");
const Restaurant = require('../models/restaurant.model.js');

const createEvent = async(event, restaurantId) => {
    try {
        const restaurant = await Restaurant.findById(restaurnatId);
        if(!restaurant){
            throw new Error (`Restaurant not found with ID ${restaurantId}`);
        }
        const createdEvent = new Events({
            restaurant: restaurantId,
            image: event.image,
            startedAt: event.startedAt,
            endsAt: event.endsAt,
            location: event.location,
            name: event.name
        });
        
        await createdEvent.save();
        return createdEvent;
    } catch (error) {
        throw new Error(`Failed to create event: ${error.message}`);
    }
}

const findAllEvent = async() => {
    try {
        const events = await Events.find();
        return events;
    } catch (error) {
        throw new Error(`Failed to find all events: ${error.message}`);
    }
}

const findRestauratnEvent = async(restaurantId) => {
    try {
        const events = await Events.find({ restaurant: restaurantId});
        return events;
    } catch (error) {
        throw new Error(`Failed to find events for restaurant ID ${restaurantId}: ${error.message}`)
    }
}

const deleteEvent = async(eventId) => {
    try {
        await Events.findByIdAndDelete(eventId);
    } catch (error) {
        throw new Error(`Failed to delete event with Id ${eventId}:${error.message}`)
    }
}


const findById = async(eventId) => {
    try {
        const event = await Events.findById(eventId);
        if(!event){
            throw new Error(`Event not found with ID ${eventId}`);
        }
        return event;
    } catch (error) {
        throw new Error(`Failed to find event with ID ${eventId}:${error.message}`)
    }
} 

module.exports = { createEvent, findAllEvent, findRestauratnEvent, deleteEvent,findById}


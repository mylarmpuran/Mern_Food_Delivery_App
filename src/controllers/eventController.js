const eventService = require('../services/event.service.js');

const createEvents = async(req, res) => {
    try {
        const { event } = req.body;
        const { restaurantId } = req.params;
        const createdEvents = await eventService.createEvent(event, restaurantId);
        res.status(202).json(createdEvents);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({ error: error.message});
        }else {
            res.status(500).json({ error: 'Internal server error'});
        }
    }
}

const findAllEvents = async(req, res) => {
    try {
        const events = await eventService.finalAllEvent();
        res.status(202).json(events);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else {
            res.status(500).json({ error: 'Internal server error'});
        }
        
    }
}

const findRestaurantEvents = async(req, res) => {
    try{
        const { restaurantId } = req.params;
        const events = await eventService.findRestaurantsEvent(restaurantId);
        res.status(202).json(events);
    }catch(error){
        if(error instanceof Error){
            res.status(400).json({error: error.message });
        }else{
            res.status(500).json({error: "Internal server error"});
        }
    }
}

const deleteEvents = async(req, res) => {
    try {
        const { id } = req.params;
        await eventService.deleteEvent(id);
        res.status(202).json({ message: 'Events Deleted', success: true});
 } catch (error) {
        res.status(500).json({error: "Internal server error "});
    }
}

model.exports = {createEvents,findAllEvents,findRestaurantEvents,deleteEvents}
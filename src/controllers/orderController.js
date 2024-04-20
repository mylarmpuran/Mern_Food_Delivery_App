
const orderService = require('../services/order.service.js')

// Customer Order 

const createOrder =async(req, res) => {
        try {
            const order = req.body;
            const user = req.user;
            if(!order) throw new Error('Please provide valid request body');
            const paymentResposnse = await orderService.createOrder(order, user);
            res.status(200).json(paymentResposnse);
        } catch (error) {
            if(error instanceof Error){
                res.status(400).json({error: error.message});
            }else{
                res.status(500).json({error: "Internal server error"});
            }
        }
}

const getAllUserOrders = async(req, res) => {
    try {
        user = req.user
        if(!user.id) throw new Error("User ID not found");
        const userOrders = await orderService.getUserOrders(user.id);
        res.status(200).json(userOrders);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }else{
            res.status(500).json({erro: "Internal server error"});
        }
    }
}

// Adming order controller

const deleteOrder= async(req, res) => {
    try{
        const { orderId } = req.params;
        await orderService.cancelOrder(orderId);
        res.status(200).json({message: `Order deleted with id ${orderId}`})
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({error: error.message});
        }else {
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

const getAllRestaurantOrders = async(req, res) => {
    try {
        const { restaurantId } = req.params;
        const { order_status } = req.query;
        const orders = await orderService.getOrdersOfRestaurant(restaurantId,order_status)
        res.status(200).json(orders);
        
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({error: error.message});
        }else {
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

const updateOrder = async(req, res) => {
    try {
        const { orderId, orderStatus } = req.params;
        const order = await orderService.updateOrder(orderId, orderStatus);
        res.status(200).json(order);
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({error: error.message});
        }else {
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

model.exports = {createOrder,getAllUserOrders,deleteOrder,getAllRestaurantOrders,updateOrder}
const Address = require('../models/address.model.js');
const OrderItem = require('../models/orderItem.model.js')
const Restaurant = require('../models/restaurant.model.js')
const Order = require('../models/order.model.js')

const createOrder = async(order, user) => {
    try {
        const address = order.deliveryAddress;
        let savedAddress;
        if(address._id){
            const isAddressExist = await Address.findById(address._id);
            if(isAddressExist){
                savedAddress = isAddressExist;
            }else {
                const shippingAddress = new Address(order.deliveryAddress);
                savedAddress = await shippingAddress.save();
            }
        }

        if(!user.addresses.includes(savedAddress._id)){
            user.addresses.push(savedAddress._id);
            await user.save();
        }

        const restaurant = await Restaurant.findById(order.restaurantId);
        if(!restaurant){
            throw new Error(`Restaurant not found with ID ${order.restaurantId}`);
        }

        const cart = await cartService.findCartByUserId(user._id);

        if(!cart){
            throw new Error('cart not found');
        }
        const orderItems = [];

        for (const cartItem of cart.items){
            const orderItem = new OrderItem({
                food: cartItem.food,
                ingredients: cartItem.ingredients,
                quantity: cartItem.quantity,
                totalPrice: cartItem.food.price * cartItem.quantity,
            });
            const savedOrderItem = await orderItem.save();
            orderItems.push(savedOrderItem._id);
        }

        const totalPrice = await cartService.calcualteCartTotal(cart);

        const createdOrder = new OrderedBulkOperation({
            customer: user._id,
            deliveryAddress: savedAddress._id,
            createdAt: new Date(),
            orderStatus: "PENDING",
            totalAmount: totalPrice,
            restaurant: restaurant._id,
            items: orderItems,
        });

        const savedOrder = await createdOrder.save();

        restaurant.orders.push(savedOrder._id);
        await restaurant.save();

        const paymentResponse = await paymentService.generatePaymentLink(
            savedOrder
        );
        console.log(paymentResponse);
        return paymentResponse;

    } catch (error) {
        throw new Error (`Failed to create order: ${error.message}`);

    }
}

const cancelOrder=async(orderId) => {
    try {
        await Order.findByIdAndDelete(orderId);
    } catch (error) {
        throw new Error(
            `Failed to cancel order with ID ${orderId}: ${error.message}`
        )
    }
}

const findOrderById=async(orderId) =>{
    try {
        const order = await Order.findById(orderId);
        if(!order){
            throw new Error(`Order not found with ID ${orderId}`);
        }
        return order;
    } catch (error) {
        throw new Error(
            `Failed to find order with ID ${orderId}: ${error.message}`
        );
    }
}

const getUserOrders = async(userId) => {
    try {
        const orders = await Order.find({ customer: userId });
        return orders;
    } catch (error) {
        throw new Error(`Failed to get user orders: ${error.message}`);
    }
}

const getOrdersOfRestaurant = async(restaurantId, orderStatus) => {
    try {
        let orders = await Order.find({ restaurant: restauranId });
        if(orderStatus){
            orders = orders.filter((order) => order.orderStatus === orderStatus);
        }
        return orders;
    } catch (error) {
        throw new Error(
            `Failed to get orders of restuarant with ID ${restaurantId}: ${error.message}`
        );
    }
}

const updateOrder = async(orderId, orderStatus) => {
    try {
        const validStatuses = [
            "OUT_FOR_DELIVERY",
            'DELIVERED',
            "COMPLETED",
            "PENDING",
        ];
        if(!validStatuses.includes(orderStatus)){
            throw new Error("Please select a valid order status");
        }

        const order = await Order.findById(orderId);
        if(!order){
            throw new Error(`Order not found with ID ${orderId}`);
        }

        order.orderStatus = orderStatus;
        await order.save();

        // Send Notification
        // await NotificationService.sendOrderStatusNotifications(order);

        return order;

    } catch (error) {
        throw new Error(
            `Failed to update order with ID ${orderId}: ${error.message}`
        );
    }
}

module.exports = {createOrder, cancelOrder, findOrderById,getUserOrders,getOrdersOfRestaurant,updateOrder }
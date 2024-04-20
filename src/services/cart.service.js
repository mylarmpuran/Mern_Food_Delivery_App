const Cart = require('../models/cart.model.js');
const CartItem = require('../models/cartItem.js');
const Food = require('../models/food.model.js');


const createCart = async(user) => {
    const cart = new Cart ({ customer: user });
    const createdCart = await cart.save();
    return createdCart;
}

const findCartByUserId =async(userId) => {
    let cart;

    cart = await Cart.findOne({customer:userId}).populate([
        {
            path: "items",
            populate:{
                path:"food",
                populate:{path: "restaurant", select:"_id"},
            },
        },
    ]);

    if(!cart){
        throw new Error("Cart not found U - ", userId);
    }

    let cartItems = await CartItem.find({ cart: cart._id }).populate("food");

    console.log("cartITems", cartItems);

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (const item of cart.items){
        totalPrice += item.price;
        totalDiscountedPrice += item.discountedPrice;
        totalItem += item.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.discounte = totalPrice - totalDiscountedPrice;

    // const updatedCart = await cart.save();
    return cart;
}

const addItemToCart = async(req, userId) => {
    const cart = await Cart.findOne({ customer: userId });
    const food = await Food.findById(req.menuItemId);

    const isPresent = await CartItem.findOne({
        cart: cart._id,
        food: food._id,
        userId,
    });

    if(!isPresent){
        const cartItem = new CartItem({
            food: food._id,
            cart: cart._id,
            quantity: 1,
            userId,
            totalPrice: food.price,
        });

        const createdCartItem = await cartItem.save();
        cart.items.push(createdCartItem);
        await cart.save();
        return createdCartItem;
    }
    return isPresent;
}

const updateCartItemQuantity = async(cartItemId, quantity) => {
    const cartItem = await CartItem.findById(cartItemId).populate([
        { path:"food", populate: {path: "restaurant", select:"_id"}},
    ]);
    if(!cartItem){
        throw new Error(`Cart item not found with Id ${cartItemId}`);
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice = quantity * cartItem.food.price;
    await cartItem.save();
    return cartItem;
}

const removeItemFromCart = async(cartItemId, user) => {
    const cart = await Cart.findOne({ customer: user._id });
    if(!cart){
        throw new Error(`Cart not found for user Id ${user._id}`);
    }

    // Remove the item from the cart

    cart.items = cart.items.filter((item) => !item.equals(cartItemId));
    await cart.save();
    return cart;
}

const clearCart = async(user) => {
    const cart = await Cart.findOne({ customer: user._id });
    if(!cart){
        throw new Error(`Cart not found for user ID ${user._id}`);
    }

    cart.items = [],
    await cart.save();
    return cart;
}

const calculateCartTotals= async(cart) => {
    try {
        let total = 0;

        for (let cartItem of cart.items){
            total += cartItem.food.price * cartItem.quantity;
        }
        return total;
    } catch (error){
        throw new Error(error.message);
    }
};


module.exports = { createCart, findCartByUserId, addItemToCart, updateCartItemQuantity, removeItemFromCart, clearCart, calculateCartTotals}

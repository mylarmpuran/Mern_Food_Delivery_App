const cartService = require('../services/cart.service.js');
const userService = require('../services/userService.js');


const addItemToCart = async(req, res) => {
    try {
        const user = req.user;
        const cart = await cartService.addItemToCart(req.body, user._id);
        res.status(200).json(cart);
    } catch (error) {
        if (
            error instanceof Error
        ){
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error "});
        }
    }
};

const updateCartItemQuantity = async(req, res) => {
    try {
        const { cartItemId, quantity } = req.body;
        const cart = await cartService.updateCartItemQuantity(
            cartItemId,
            quantity
        );
        res.status(200).json(cart);
    }catch (error) {
        if (
            error instanceof Error
        ){
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error "});
        }
    }
}

const removeItemFromCart = async(req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const cart = await cartService.removeItemFromCart(id, user);
        res.status(200).json(cart);
    } catch (error) {
        if (
            error instanceof Error
        ){
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error "});
        }
    }
}

const calculateCartTotals = async(req, res) => {
    try {
        const { cartId, jwt } = req.query;
        const user = await userService.findUserProfileByjwt(jwt);
        const cart = await cartService.findCartByUserId(user.getId());
        const total = await cartService.calculateCartTotals(cart);
        res.status(200).json(total);
    } catch (error) {
        if (
            error instanceof Error
        ){
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error "});
        }
    }
}

const findUserCart = async(req, res) => {
    try{
        const user = req.user;
        console.log("req user", user._id)
        const cart = await cartService.findCartByUserId(user._id.toString());
        res.status(200).json(cart);
    }catch (error) {
        if (
            error instanceof Error
        ){
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error "});
        }
    }
}

const clearCart = async(req,res) => {
    try {
        const user = req.user
        const cart = await cartService.clearCart(user);
        res.status(200).json(cart);
    } catch (error) {
        if (
            error instanceof Error
        ){
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error "});
        }
    }
}

module.exports = {addItemToCart,updateCartItemQuantity,removeItemFromCart,calculateCartTotals,findUserCart,clearCart}
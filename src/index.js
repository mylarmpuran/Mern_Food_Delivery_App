const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const homeRouter = require("./routes/homeRoutes.js");
const register = require("./routes/authRoutes.js");
const userRoutes = require('./routes/userRoutes.js')
const restaurantRoutes=require('./routes/restaurantRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')
const menuItemRoutes=require('./routes/menuItemRoutes.js');
const adminRestaurantRoutes = require('./routes/adminRestaurantRoutes.js');
const adminOrderRoutes= require('./routes/adminOrderRoutes.js')
const cartRoutes = require('./routes/cartRoutes.js');
const cartItemRoutes = require('./routes/cartItemRoutes.js')
const adminCategoryRoutes = require('./routes/adminCategoryRoutes.js');
const adminIngredientsRoutes = require('./routes/adminIngredientsRoutes.js');
const adminEventsRoutes=require('./routes/adminEventRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js')


const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", homeRouter)
app.use('/auth',register);
app.use('/api/users',userRoutes);
app.use('/api/restaurants',restaurantRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/food',menuItemRoutes)
app.use('/api/admin/restaurants',adminRestaurantRoutes)
app.use('/api/admin/order',adminOrderRoutes);
app.use('/api/cart',cartRoutes);
app.use('api/cart-item',cartItemRoutes)
app.use('/api/admin/category',adminCategoryRoutes);
app.use('/api/admin/ingredients',adminIngredientsRoutes)
app.use('/api/admin/event',adminEventsRoutes)
app.use('/api/events',eventRoutes)




module.exports = {app};
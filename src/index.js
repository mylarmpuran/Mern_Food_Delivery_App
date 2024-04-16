const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const homeRouter = require("./routes/homeRoutes.js");
const register = require("./routes/authRoutes.js");
const userRoutes = require('./routes/userRoutes.js')



const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", homeRouter)
app.use('/auth',register);
app.use('/api/users',userRoutes);

module.exports = { app };
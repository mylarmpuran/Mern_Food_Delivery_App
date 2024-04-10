const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const homeRouter = require("./routes/homeRoutes.js");
const register = require("./routes/authRoutes.js");



const app = express();


app.use("/", homeRouter)
app.use('/auth',register);



app.use(cors());

app.use(bodyParser.json());

module.exports = { app };
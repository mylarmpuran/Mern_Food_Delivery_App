const { mongoose } = require("mongoose");

 const mongodbUrl = "mongodb://localhost:27017/Food-Ordering-App";


 async function connectDB(){
    return mongoose.connect(mongodbUrl);
 }


module.exports = connectDB
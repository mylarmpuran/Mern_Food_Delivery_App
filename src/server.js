const { app } = require(".");
const connectDB = require("./config/db.js");

const PORT=5454

app.listen(PORT, async() => {
    await connectDB()
    console.log("server is running on port" +" "+ PORT)
})
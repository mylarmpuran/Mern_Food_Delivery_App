const express = require('express');
const router = express.Router();

router.get("", async (req, res) => {
    res.status(200).send({message:"welcome to online fodd ordering website"});
})

module.exports=router;


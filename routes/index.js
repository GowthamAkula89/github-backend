const express = require("express");
const userRoute = require("./user.route");
const router = express.Router();
console.log("route")
router.use('/users', userRoute)
module.exports = router;
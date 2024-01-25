const mongoose = require ('mongoose');
const app=require("./app");
const connectDB = require('./config/config');
const dotenv =require("dotenv").config();
const PORT =process.env.PORT;
connectDB();

app.listen(PORT,()=>{
    console.log("Listening in the port:"+PORT);
})
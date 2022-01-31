const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs =require('bcryptjs');
const jwt = require('jsonwebtoken');
let PORT = process.env.PORT || 8000;
// mongoose conn
mongoose.connect("mongodb://localhost:27017/batch_5_2")
.then(()=>{
    console.log("mongodb batch_5_2 connected")
})
.catch(err=>console.log(err))
// custom module
const movieRouter=require("./controllers/movies");
const userRouter = require("./controllers/users");
//
const verifyToken = require("./verifyToken")
//
const app = express();
app.use(express.json())
//cors err handling
app.use(cors())

app.use("/movies",movieRouter)
app.use("/users",userRouter)
app.listen(PORT);






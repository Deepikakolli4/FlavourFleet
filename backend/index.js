const express = require("express");
const app = express()
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
dotEnv.config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=>{
   console.log(error);
})
app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to FlavourFeet</h1>");
 })
const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})

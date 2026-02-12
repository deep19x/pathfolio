require('dotenv').config();
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')

const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trip');

dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/trip",tripRoutes);


const port = process.env.PORT || 3000;
app.listen(port,()=> {
    console.log(`App is listening to port ${port}`);
});
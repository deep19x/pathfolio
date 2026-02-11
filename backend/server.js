require('dotenv').config();
const express = require("express");
const app = express();

const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/auth');

dbConnect();

app.use(express.json());

app.use("/api/auth",authRoutes);


const port = process.env.PORT || 3000;
app.listen(port,()=> {
    console.log(`App is listening to port ${port}`);
});
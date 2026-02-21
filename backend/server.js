require('dotenv').config();
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trip');

dbConnect();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/trip",tripRoutes);


const port = process.env.PORT || 3000;
app.listen(port,()=> {
    console.log(`App is listening to port ${port}`);
});
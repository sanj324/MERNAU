import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

const app = express();

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Routes
app.use("/api/user",userRoutes);

app.listen(3000,()=>{
    console.log("server is running on port 3000!!");
});
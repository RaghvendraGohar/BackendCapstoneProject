import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js";

const app = express();

dotenv.config();

const PORT = 6000;
app.use(express.json());
app.get('/health',(req,res)=>{
    console.log("health api");
    res.json({
        service:'backend jobs listing API server',
        status:"active",
        time:new Date(),
    });

}) 

app.use("/api/v1/auth",authRoutes);

mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{console.log("Db connected")})
.catch((error)=>{console.log("Db failed to connect :",error)})

app.listen(PORT,()=>{
    console.log(`backend running on port : ${PORT}`)
    
});
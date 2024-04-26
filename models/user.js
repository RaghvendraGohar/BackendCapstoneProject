import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required:true,
    },
    email :{
        type : String,
        required:true,
        unique:true,
    },
    password :{
        type : String,
        required:true,
    },
    mobile :{
        type : String,
        required:true,
    },
},{timestamps:{createdAt:"createdAt",updatedAt:"updatedAt"}})

const User = mongoose.model("User", userSchema); // Changed model name to "User"

export default User;
import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String, 
        required: true,
        min: 4,
        unique: true
    },
    password:{
        type: String, 
        required: true,
        
    }

})
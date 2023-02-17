import mongoose from "mongoose";
import { Schema } from "mongoose";

export const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobNumber:
    {
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    location: {
        type: { 
            type: String, 
            enum: ['Point'] 
        },
        coordinates: { 
            type: [Number] 
        }
    }
});

userSchema.index({ location: "2dsphere" }); 

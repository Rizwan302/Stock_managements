import mongoose from "mongoose";


const schModel = new mongoose.Schema({
    name:String
})

export const mangeSchema = mongoose.models.managements || mongoose.model("managements", schModel)
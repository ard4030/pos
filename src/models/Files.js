import mongoose, { Schema, model, models } from "mongoose";

const fileSchema = new Schema({
    name : {type:String,default:""},
    path : {type:String,default:""},
    slug : {type:String,default:""},
    size : {type:String,default:""},
    mobile : {type:String,default:""},
},
{ timestamps: true });

const File = models.File || model("File", fileSchema);

export default File;

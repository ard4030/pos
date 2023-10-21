import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    price : {type : Number,default:0},
    name : {type : String,default:""},
    images : {type:[String],default:[]},
    brand : {type:String,default:""},
    specifications : {type:[Object]},
    status : {type:String,default:"new"},
    count : {type:Number,default:1}
},
{ timestamps: true });

const Product = models.Product || model("Product", productSchema);

export default Product;

import mongoose, { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
    userId : {type : mongoose.Types.ObjectId},
    productId : {type : mongoose.Types.ObjectId,require:true},
    status:{type:String,default:"deviceOk"},
    lastStatus:{type:String,default:"deviceOk"},
    first_name:{type:String,default:""},
    last_name:{type:String,default:""},
    melli:{type:String,default:""},
    images:[{path:String,slug:String,status:String}],
    mobile : {type : String},
    message:{type : String}
},
{ timestamps: true });

const Order = models.Order || model("Order", orderSchema);

export default Order;

import mongoose from "mongoose"

async function connectDB(){
    if (mongoose.connections[0].readyState === 1) return;
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");   
}

export default connectDB;

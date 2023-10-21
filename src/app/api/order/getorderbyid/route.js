import Order from "@/models/Orders";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
        const { mobile , id } = await req.json();
        const UserData = await User.findOne({mobile});
        if(!UserData.Roles.includes('ADMIN')){
            return NextResponse.json(
                {error:"عدم دسترسی"},
                {status: 403}
            )
        }
        const OrderData = await Order.aggregate([
            {
                $match:{_id: new mongoose.Types.ObjectId(id)}
            },
            { 
                $lookup : {
                    from:"products",
                    localField:"productId",
                    foreignField:"_id",
                    as:"device"
                }
            },
        ]);
        console.log(OrderData)
        if(OrderData && OrderData.length > 0 && !OrderData[0].productId){
            return NextResponse.json(
                {error:"ابتدا دستگاه موردنظر خود را انتخاب کنید"},
                {status:403}
            )
        }

        return NextResponse.json(
            {data:OrderData},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}
import Order from "@/models/Orders";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
        const {mobile} = await req.json();
        const device = await Order.aggregate([
            {
                $match:{mobile},
            },
            {
                $lookup:{
                    "from":"products",
                    "localField":"productId",
                    "foreignField":"_id",
                    "as":"dev"
                }
            }
        ]);


        return NextResponse.json(
            {data:device[0].dev},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:error},
            {status:500}
        )
    }
}
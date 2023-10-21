import Order from "@/models/Orders";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
        const {mobile,slug} = await req.json();
        const order = await Order.findOne({mobile});
        const data = order.images.find(item => item.slug === slug);

        return NextResponse.json(
            {data:data},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:"خطا در ارتباط با سرور"},
            {status:500}
        )
    }
}
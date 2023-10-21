import Order from "@/models/Orders";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
        const { mobile } = await req.json();
        const OrderData = await Order.findOne({mobile});
        if(!OrderData.productId){
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
            {error:"خطا در برقراری ارتباط با سرور"},
            {status:500}
        )
    }
}
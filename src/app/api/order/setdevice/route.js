import Order from "@/models/Orders";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
        const {id,mobile} = await req.json();
        const isOrder = await Order.findOne({mobile});
        if(isOrder){
            const Update = await Order.updateOne({mobile},{$set:{productId:id,status:"deviceSelect"}});
            if(!Update){
                return NextResponse.json(
                    {message:"خطا در ایجاد"},
                    {status:400}
                )
            }
        }else{
            const Create = await Order.create({productId:id,mobile,status:"deviceSelect"});
            if(!Create){
                return NextResponse.json(
                    {message:"خطا در ایجاد"},
                    {status:400}
                )
            }
        }

        return NextResponse.json(
            {message:"محصول با موفقیت انتخاب شد"},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:error},
            {status:500}
        )
    }
}
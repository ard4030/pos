import Order from "@/models/Orders";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
        const {mobile,first_name,last_name,melli} = await req.json();
        const Save = await Order.findOneAndUpdate({mobile},{$set:{first_name,last_name,melli,status:"detailComplate"}});
        if(!Save) throw new Error('مشکلی در ثبت اطلاعات به وجود آمد');


        return NextResponse.json(
            {data:Save},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:"خطا در ارتباط با سرور"},
            {status:500}
        )
    }
}
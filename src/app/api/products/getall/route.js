import Product from "@/models/Products";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
        const result = await Product.find();
        const { min , max , mojood } = await req.json();
        console.log("This Is Min",min);
        console.log("This Is max",max);
        console.log("This Is Mojood",mojood);
        if(!result) {
            return NextResponse.json(
                {error:"خطا در دریافت اطلاعات"},
                {status:400}
            )
        }

        return NextResponse.json(
            {data:result},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:"خطا در ارتباط با سرور"},
            {status:500}
        )
    }
}
import Product from "@/models/Products";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
        const {name,price,images} = await req.json();
        const result = await Product.create({name,price,images});
        if(!result) {
            return NextResponse.json(
                {error:"خطا در ایجاد محصول"},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:"محصول با موفقیت ایجاد شد"},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:"خطا در ارتباط با سرور"},
            {status:500}
        )
    }
}
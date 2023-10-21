import Product from "@/models/Products";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
        const {mobile,id} = await req.json();

        // Access
        const isAccess = await User.findOne({mobile});
        if(!isAccess.Roles.includes('ADMIN')){
            return NextResponse.json(
                {error:"عدم دسترسی"},
                {status:400}
            )
        }

        const product = await Product.findOne({_id:id});
        if(!product) {
            return NextResponse.json(
                {error:"محصول پیدا نشد"},
                {status:403}
            )
        }

        return NextResponse.json(
            {data:product},
            {status:200}
        )

    } catch (error) {
        return NextResponse.json(
            {error:"خطا در ارتباط با سرور"},
            {status:500}
        )
    }
}
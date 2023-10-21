import Product from "@/models/Products";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
        const {mobile,name,price,images,brand,specifications,status,count,_id} = await req.json();
        
        // Check Access
        const isAccess = await User.findOne({mobile});
        if(!isAccess.Roles.includes('ADMIN')){
            return NextResponse.json(
                {error:"عدم دسترسی"},
                {status:400}
            )
        }

        // Add Or Update
        if(_id){
            const EditProduct = await Product.updateOne({_id:_id},{$set:{
                name,price,images,brand,specifications,status,count
            }});
            return NextResponse.json(
                {msg:"محصول با موفقیت ویرایش شد"},
                {status:200}
            )
        }else{
            const CreateProduct = await Product.create({
                name,price,images,brand,specifications,status,count
            });
            return NextResponse.json(
                {msg:"محصول با موفقیت افزوده شد"},
                {status:200}
            )
        }
    } catch (error) {
        return NextResponse.json(
            // {error:"خطا در برقراری ارتباط با سرور"},
            {error:error.message},
            {status:500}
        )
    }
}
import File from "@/models/Files";
import Product from "@/models/Products";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
const fs = require('fs');


export async function POST(req){
    try {
        await connectDB();
        const {mobile,id,images} = await req.json();

        const isAccess = await User.findOne({mobile});
        if(!isAccess.Roles.includes('ADMIN')){
            return NextResponse.json(
                {error:"عدم دسترسی"},
                {status:400}
            )
        }

        const deleteItem = await Product.deleteOne({_id:id});
        if(!deleteItem){
            return NextResponse.json(
                {error:"خطای ناشناخته"},
                {status:405}
            )
        }

        images.forEach(async element => {
            let startIndex = element.indexOf("/upload");
            let extractedPart = "./public" + element.substring(startIndex);
        
            if (fs.existsSync(extractedPart)) {
                try {
                    fs.unlinkSync(extractedPart);
                    const deleteData = await File.deleteOne({mobile,path:element});
                    if(!deleteData) throw new Error('خطا در حذف')
                    
                } catch (err) {
                    console.error(err)
                }
            } else {
                console.log('File not found');
            }
        });



        return NextResponse.json(
            {data:"با موفقیت حذف شد"},
            {status:200},
        )

    } catch (error) {
        return NextResponse.json(
            {error:"خطا در ارتباط با سرور"},
            {status:500}
        )
    }
}
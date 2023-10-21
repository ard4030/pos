import File from "@/models/Files";
import Order from "@/models/Orders";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
const fs = require('fs');

export async function POST(req){
    try {
        await connectDB();
        const {mobile,path} = await req.json();
        const isAccess = await User.findOne({mobile});
        if(!isAccess.Roles.includes("ADMIN")){
            return NextResponse.json({ error: "عدم دسترسی" },{status:400})
        }

        
        let startIndex = path.indexOf("/upload");
        let extractedPart = "./public" + path.substring(startIndex);
      

        if (fs.existsSync(extractedPart)) {
            try {
                fs.unlinkSync(extractedPart);
                const deleteData = await File.deleteOne({mobile,path});
                if(!deleteData) throw new Error('خطا در حذف')
                
            } catch (err) {
                console.error(err)
            }
        } else {
            console.log('File not found');
        }

        return NextResponse.json(
            {data:"با موفقیت حذف شد"},
            {status:200}
        )


    } catch (error) {
        return NextResponse.json(
            {error:error},
            {status:500}
        )
    }
}
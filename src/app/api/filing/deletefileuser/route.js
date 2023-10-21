import File from "@/models/Files";
import Order from "@/models/Orders";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
const fs = require('fs');

export async function POST(req){
    try {
        await connectDB();
        const {mobile,path,slug} = await req.json();
        const order = await Order.findOne({mobile});
        if(!order) throw new Error('خطا در دریافت سفارش');
        let imgs = order.images;
        imgs.forEach((element,index) => {
            if(element.slug === slug){
                imgs.splice(index)
                // delete imgs[index]
                return false
            }
        });
        
        let startIndex = path.indexOf("/upload");
        let extractedPart = "./public" + path.substring(startIndex);
      

        if (fs.existsSync(extractedPart)) {
            try {
                fs.unlinkSync(extractedPart);
                const deleteData = await File.deleteOne({mobile,slug});
                const updatedata = await Order.updateOne({mobile},{$set:{images:imgs}})
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
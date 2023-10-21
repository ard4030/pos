import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';
import File from "@/models/Files";
import Order from "@/models/Orders";
const path = require("path")

export async function POST(req){
    try {
        await connectDB();
        const data = await req.formData();
        const file = data.get('file');
        const mobile = data.get('mobile');
        const slug = data.get('slug')

        if (!file || !mobile || !slug) {
            return NextResponse.json({ error: "استفاده غیر مجاز" },{status:400})
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadPath = `./public/uploads/${mobile}`; 

        await mkdir(uploadPath, { recursive: true });
        const filePath = `${uploadPath}/${file.name}`;
        await writeFile(filePath, buffer);

        const Saving = await File.create({
            name:file.name,
            size:file.size,
            slug,
            mobile,
            path:filePath.substring(8)
        });
        if(!Saving) throw new Error('خطا در آپلود');

        const order = await Order.findOne({mobile});
        if(!order) throw new Error('سفارش پیدا نشد');

        let imgs = order.images;
        const x = imgs.find(item => item.slug === slug);
        if(x){
            imgs.forEach(element => {
                if(element.slug === slug){
                    element.path =filePath.substring(8);
                    return false;
                }
            });
        }else{
            imgs.push({path:filePath.substring(8),status:"pending",slug})
        }

        const updatig = await Order.updateOne({mobile},{$set:{images:imgs}});
        if(!updatig) throw new Error('خطا در آپدیت')


        return NextResponse.json(
            {data:filePath.substring(8)},
            {status:200}
            );

    } catch (error) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';
import File from "@/models/Files";
import Order from "@/models/Orders";
import User from "@/models/User";
const path = require("path")

export async function POST(req){
    try {
        await connectDB();
        const data = await req.formData();
        const file = data.get('file');
        const mobile = data.get('mobile');

        if (!file || !mobile) {
            return NextResponse.json({ error: "استفاده غیر مجاز" },{status:400})
        }

        const isAccess = await User.findOne({mobile});
        if(!isAccess.Roles.includes("ADMIN")){
            return NextResponse.json({ error: "عدم دسترسی" },{status:400})
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadPath = `./public/uploads/productImages`; 

        await mkdir(uploadPath, { recursive: true });
        const filePath = `${uploadPath}/${file.name}`;
        await writeFile(filePath, buffer);

        const Saving = await File.create({
            name:file.name,
            size:file.size,
            slug:"productImage",
            mobile,
            path:filePath.substring(8)
        });
        console.log(Saving)
        if(!Saving) throw new Error('خطا در آپلود');

        return NextResponse.json(
            {data:{Saving}},
            {status:200}
            );

    } catch (error) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}
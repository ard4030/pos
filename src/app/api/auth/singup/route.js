import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import {hashPassword} from '../../../../utils/functions'

export async function POST(req){
    try {
        const {mobile,code,password} = await req.json();
        await connectDB();
        const user = await User.findOne({mobile});
        // Check User
        if(!user){
            return NextResponse.json(
                {error:"کاربر یافت"},
                {status:400}
            )
        }
        // Check Code
        if(user.otp.code != code){
            return NextResponse.json(
                {error:"کد وارد شده صحیح نیست"},
                {status:401}
            )
        }
        // Check Expire Code
        let now = new Date().getTime();
        if(user.otp.expiresIn < now) {
            return NextResponse.json(
                {error:"کد وارد شده منقضی شده"},
                {status:401}
            )
        }

        const hashedPassword = await hashPassword(password);
        const saveUser = await User.updateOne({mobile},{$set:{password:hashedPassword}});
        if(!saveUser){
            return NextResponse.json(
                {error:"خطا در ذخیره اطلاعات"},
                {status:401}
            )
        }

        return NextResponse.json(
            {message:"شما با موفقیت ثبت نام شدید"},
            {status:200}
        )

    } catch (error) {
        return NextResponse.json(
            {error:"خطا در ارتباط با سرور"},
            {status:500}
        )
    }
}
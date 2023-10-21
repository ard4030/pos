import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { farazSms, RandomNumberGenerator, /*updateUser*/ } from "@/utils/functions";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const { mobile } = await req.json();
        await connectDB();
        const isUser = await User.findOne({mobile});

        if(isUser && isUser.password){
            return NextResponse.json(
                {error:"شما قبلا ثبت نام شدید لطفا وارد شوید"},
                {status:302}
            )
        }

        // SendSms
        const code = RandomNumberGenerator();
        const resultSms = await farazSms(mobile,code);
        if(!resultSms){
            return NextResponse.json(
                {error:"مشکلی در ارسال پیامک به وجود آمد"},
                {status:203}
            )
        }

        // Save User
        let otp = {
            code,
            expiresIn : Date.now() + 180000,
            timeSend : new Date().getTime()
        }

        if(isUser && !isUser.password){
            // const res = await updateUser(mobile,{otp});
            Object.keys(otp).forEach(key => {
                if([""," ",0,null,undefined,NaN,"0"].includes(otp[key])) delete otp[key]
            })
            const updateResult = await User.updateOne({mobile},{$set : {otp}})
            const res = !!updateResult.modifiedCount
            // return !!(await updateResult).modifiedCount

            if(!res){
                return NextResponse.json(
                    {error:"مشکلی در ثبت نام به وجود آمده"},
                    {status:203}
                )
            }
        }

        if(!isUser){
            const saveCode = await User.create({
                mobile,
                otp,
                Roles : ["USER"]
            })

            if(!saveCode) {
                return NextResponse.json(
                    {error:"مشکلی در ثبت نام به وجود آمده"},
                    {status:203}
                )
            }
        }


        return NextResponse.json(
            {message:"کد اعتبار سنجی با موفقیت ارسال شد"},
            {status:200},
            {code:code},
            {mobile:mobile}
        )

    } catch (error) {
        return NextResponse.json(
            {error:"مشکلی در سرور رخ داده است"},
            {status:500}
        )
    }
}
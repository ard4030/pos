import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { farazSms, RandomNumberGenerator, /*updateUser*/ } from "@/utils/functions";


export async function POST(req){
    try {
        const {mobile} = await req.json();
        await connectDB();

        const user = await User.findOne({mobile});
        if(!user) {
            return NextResponse.json(
                {error:"لطفا ابتدا ثبت نام کنید"},
                {status:401}
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

        let otp = {
            code,
            expiresIn : Date.now() + 180000,
            timeSend : new Date().getTime()
        }

        // const res = await updateUser(mobile,{otp});
        Object.keys(otp).forEach(key => {
            if([""," ",0,null,undefined,NaN,"0"].includes(otp[key])) delete otp[key]
        })
        const updateResult = await User.updateOne({mobile},{$set : {otp}})
        const res = !!updateResult.modifiedCount
        if(!res){
            return NextResponse.json(
                {error:"مشکلی در ثبت نام به وجود آمده"},
                {status:203}
            )
        }

        return NextResponse.json(
            {message:"کد اعتبار سنجی با موفقیت ارسال شد"},
            {status:200},
            {code:code},
            {mobile:mobile}
        )

    } catch (error) {
        return NextResponse.json(
            {error:"خطا در ارتباط با سرور"},
            {status:500}
        )
    }
}
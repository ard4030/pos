import { NextResponse } from "next/server";

export async function GET(req){
    try {
       return NextResponse.json(
            {message:"اطلاعات دریافت شد"},
            {status:200}
        )
    } catch (error) {
       return NextResponse.json(
            {error:"خطا در ارتباط با سرور"},
            {status:500}
        )
    }
}
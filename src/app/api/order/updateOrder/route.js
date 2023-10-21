import Order from "@/models/Orders";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const {id,mobile,message,status} = await req.json();
        const UserChanged = await User.findOne({mobile});
        if(!UserChanged.Roles.includes("ADMIN")){
            return NextResponse.json(
                {error:"شما به این قسمت دسترسی ندارید"},
                {status:404}
            )
        }

        const UpdateOrder = await Order.updateOne({_id:id},{$set:{message,status}});

        return NextResponse.json(
            {message:"ویرایش شد!"},
            {status:200}
        )

    } catch (error) {
        return NextResponse.json(
            {error:"خطا در ارتباط با سرور"},
            {status:500}
        )
    }
}
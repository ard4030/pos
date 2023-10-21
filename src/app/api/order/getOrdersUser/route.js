import Order from "@/models/Orders";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB();
        let { page, size, sort , mobile } = await req.json();
        if (!page) {page = 1}
        if (!size) {size = 10;}
        const limit = parseInt(size);
        if (!page) {page = 1}
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const count = await Order.find({mobile});
        const result = await Order.aggregate([
            { $match : {mobile}},
            { 
                $lookup : {
                    from:"products",
                    localField:"productId",
                    foreignField:"_id",
                    as:"device"
                }
            },
            { $sort : {_id: -1 } },
            { $limit : endIndex },
            { $skip : startIndex }
        ]);


        return NextResponse.json(
            {data:result},
            {status:200},
            {success:true},
            {page},
            {size},
            {count}
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error:"خطا در ارتباط با سرور"},
            {status:500}
        )
    }
}
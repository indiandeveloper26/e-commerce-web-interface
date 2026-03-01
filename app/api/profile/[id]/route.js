import { NextResponse } from "next/server";


import dbConnect from "../../../lib/mongodb";
import Usercrate from "../../../models/User";

export async function GET(request, { params }) {
    try {
        await dbConnect();
        const { id } = await params;


        console.log('idd', id)


        // User dhundho aur cart/orders ko populate karo


        let user = await Usercrate.findById(id)


        // const user = await Usercrate.findById(id)
        //     .populate({
        //         path: 'cart.product',
        //         model: 'Product'
        //     })
        //     .populate('orders')
        //     .select("-password"); // Password hide rakho

        // if (!user) {
        //     return NextResponse.json({ error: "User not found" }, { status: 404 });
        // }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server Error: " + error.message }, { status: 500 });
    }
}








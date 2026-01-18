import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Usercrate from "../../../../models/User";

export async function GET(req, { params }) {

    try {

        const { orderid } = await params
        console.log('redd', orderid)
        await dbConnect();

        // normally JWT se aayega
        const userId = orderid

        // if (!userId) {
        //     return NextResponse.json(
        //         { success: false, message: "User ID required" },
        //         { status: 400 }
        //     );
        // }

        const user = await Usercrate.findById(userId).populate({
            path: "orders",
            options: { sort: { createdAt: -1 } }, // latest orders first
            populate: {
                path: "products.product",   // nested populate
                model: "Product",
                select: "name price images", // sirf ye fields chahiye
            },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            orders: user,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}

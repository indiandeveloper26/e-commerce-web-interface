import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Usercrate from "../../../../models/User";
import Order from "../../../../models/order";   // case-sensitive import
import Product from "../../../../models/itemlist";

export async function GET(req, { params }) {

    let { orderid } = await params
    console.log('diddd', orderid)
    await dbConnect();
    if (orderid === 'undefind') {
        return NextResponse.json({ 'data': "id not found" })
    }

    try {

        const userWithOrders = await Usercrate.findById(orderid)
            .populate({
                path: "orders",
                options: { sort: { createdAt: -1 } }, // latest first
                populate: {
                    path: "products.product",
                    model: "Product",
                    select: "name price images",
                },
            })
            .lean();

        if (!userWithOrders) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: userWithOrders }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

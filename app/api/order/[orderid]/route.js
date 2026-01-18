

import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Order from "../../../models/order";


// // app/api/order/[orderid]/route.js


// // Named export for GET request
export async function GET(req, { params }) {
    const { orderid } = await params; // ✅ this is how you get the dynamic route param
    console.log("orderid: aagyaa", orderid);

    await dbConnect();

    try {
        const order = await Order.findById(orderid).populate("products.product");
        console.log("orderdata:", order);

        if (!order) {
            return new Response(JSON.stringify({ message: "Order not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ order }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}



// export async function GET(req, { params }) {

//     try {

//         const { orderid } = await params
//         console.log('redd', orderid)
//         await dbConnect();

//         // normally JWT se aayega
//         const userId = "6960b6746358147923ff52a0";

//         // if (!userId) {
//         //     return NextResponse.json(
//         //         { success: false, message: "User ID required" },
//         //         { status: 400 }
//         //     );
//         // }

//         const user = await Usercrate.findById(userId).populate({
//             path: "orders",
//             options: { sort: { createdAt: -1 } }, // latest orders first
//             populate: {
//                 path: "products.product",   // nested populate
//                 model: "Product",
//                 select: "name price images", // sirf ye fields chahiye
//             },
//         });

//         if (!user) {
//             return NextResponse.json(
//                 { success: false, message: "User not found" },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json({
//             success: true,
//             orders: user,
//         });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json(
//             { success: false, message: "Server error" },
//             { status: 500 }
//         );
//     }
// }

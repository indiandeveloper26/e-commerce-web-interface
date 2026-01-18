import dbConnect from "../../lib/mongodb";
import Order from "../../models/order";
import Usercrate from "../../models/User";


export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json(); // Next.js 16 App Router style
        const { userId, product, quantity, totalPrice, address, paymentMethod } = body;

        if (!userId || !product || !totalPrice || !address) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const order = await Order.create({
            userId,
            products: [
                {
                    product: product._id,
                    quantity: quantity || 1,
                    price: product.price,
                },
            ],
            totalPrice,
            address,
            paymentMethod: paymentMethod || "Online",
            status: "Pending",
        });

        return new Response(JSON.stringify({ success: true, order }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Server error", error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}




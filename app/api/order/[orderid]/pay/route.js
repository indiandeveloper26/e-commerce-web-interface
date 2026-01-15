
import crypto from "crypto";
import dbConnect from "../../../../lib/mongodb";
import Order from "../../../../models/order";

export async function POST(req, { params }) {
    const { orderid } = await params;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();



    // verify signature
    const generated_signature = crypto
        .createHmac("sha256", "UfpXFSrIeX0cmHGXJoDHurhI",)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (generated_signature !== razorpay_signature) {
        return new Response(JSON.stringify({ message: "Payment verification failed" }), { status: 400 });
    }

    await dbConnect();
    try {
        const order = await Order.findById(orderid);
        if (!order) return new Response(JSON.stringify({ message: "Order not found" }), { status: 404 });

        order.status = "Paid";
        order.paymentId = razorpay_payment_id;
        order.paymentDate = new Date();
        await order.save();

        console.log('ho gyyaa')
        return new Response(JSON.stringify({ message: "Payment verified and order updated", order }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}

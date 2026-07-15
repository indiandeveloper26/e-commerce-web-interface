
// import crypto from "crypto";
// import dbConnect from "../../../../lib/mongodb";
// import Order from "../../../../models/order";
// import Usercrate from "../../../../models/User";

// export async function POST(req, { params }) {
//     const { orderid } = await params;

//     const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userid } = await req.json();


//     // console.log('orderidd', orderid, 'userid', userid)

//     console.log('all data', razorpay_payment_id, razorpay_order_id, razorpay_signature, userid)

//     // verify signature
//     const generated_signature = crypto
//         .createHmac("sha256", "UfpXFSrIeX0cmHGXJoDHurhI",)
//         .update(razorpay_order_id + "|" + razorpay_payment_id)
//         .digest("hex");

//     if (generated_signature !== razorpay_signature) {

//         console.log('erro ', "Payment verification failed")
//         return new Response(JSON.stringify({ message: "Payment verification failed" }), { status: 400 });
//     }

//     await dbConnect();
//     try {

//         // let userId = "6960b6746358147923ff52a0"
//         const order = await Order.findById(orderid);
//         if (!order) return new Response(JSON.stringify({ message: "Order not found" }), { status: 404 });




//         order.status = "Paid";
//         order.paymentId = razorpay_payment_id;
//         order.paymentDate = new Date();
//         await order.save();
//         console.log('iddd', order._id)

//         await Usercrate.findByIdAndUpdate(
//             userid,
//             { $push: { orders: order._id } },
//             { new: true }
//         );

//         console.log('ho gyyaa')
//         return new Response(JSON.stringify({ message: "Payment verified and order updated", order }), { status: 200 });
//     } catch (err) {


//         console.log('errro her enow', err)
//         return new Response(JSON.stringify({ message: err.message }), { status: 500 });
//     }
// }



import crypto from "crypto";
import dbConnect from "../../../../lib/mongodb";
import Order from "../../../../models/order";
import Usercrate from "../../../../models/User";

export async function POST(req, { params }) {
    try {
        await dbConnect();

        const { orderid } = await params;

        const body = await req.json();

        console.log("========== PAYMENT VERIFY ==========");
        console.log("Order ID:", orderid);
        console.log("Body:", body);

        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            userid,
        } = body;

        if (
            !razorpay_payment_id ||
            !razorpay_order_id ||
            !razorpay_signature ||
            !userid
        ) {
            console.log("❌ Missing Fields");

            return Response.json(
                {
                    message: "Missing required fields",
                    body,
                },
                { status: 400 }
            );
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        console.log("Generated:", generatedSignature);
        console.log("Received :", razorpay_signature);

        if (generatedSignature !== razorpay_signature) {
            console.log("❌ Signature Mismatch");

            return Response.json(
                {
                    message: "Payment verification failed",
                    generatedSignature,
                    razorpay_signature,
                },
                { status: 400 }
            );
        }

        const order = await Order.findById(orderid);

        console.log("Order Found:", !!order);

        if (!order) {
            return Response.json(
                {
                    message: "Order not found",
                },
                { status: 404 }
            );
        }

        order.status = "Paid";
        order.paymentId = razorpay_payment_id;
        order.paymentDate = new Date();

        await order.save();

        console.log("✅ Order Updated");

        const user = await Usercrate.findByIdAndUpdate(
            userid,
            {
                $push: {
                    orders: order._id,
                },
            },
            { new: true }
        );

        console.log("User Updated:", !!user);

        return Response.json(
            {
                success: true,
                message: "Payment verified",
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("VERIFY ERROR");
        console.error(err);

        return Response.json(
            {
                success: false,
                message: err.message,
                stack: err.stack,
            },
            { status: 500 }
        );
    }
}
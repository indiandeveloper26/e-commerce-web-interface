import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET

});

export async function POST(req) {


    console.log('pyametn catingggg.....',


        process.env.RAZORPAY_KEY_ID,
        process.env.RAZORPAY_KEY_SECRET
    )

    // return NextResponse.json({ 'dafdsaf': "dataayayaya" })
    try {
        const { orderId, amount } = await req.json(); // amount in paise

        console.log('data', orderId, amount)
        console.log(orderId)

        const options = {
            amount,
            currency: "INR",
            receipt: orderId,
        };

        const paymentOrder = await razorpay.orders.create(options);

        return new Response(JSON.stringify(paymentOrder), { status: 200 });
    } catch (err) {

        console.log('error ', err)

        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}

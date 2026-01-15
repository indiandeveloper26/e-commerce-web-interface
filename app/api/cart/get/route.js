import { NextResponse } from "next/server";

import dbConnect from "../../../lib/mongodb";
import Usercrate from "../../../models/User";

export async function POST(req) {
    try {
        await dbConnect();

        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json(
                { message: "userId required" },
                { status: 400 }
            );
        }

        const user = await Usercrate.findById(userId)
            .populate("cart.product");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            cart: user.cart,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

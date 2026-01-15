import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Usercrate from "../../../models/User";
import Product from "../../../models/itemlist";


export async function POST(req) {
    try {
        await dbConnect();

        const { userId, productId } = await req.json();

        if (!userId || !productId) {
            return NextResponse.json(
                { message: "userId and productId required" },
                { status: 400 }
            );
        }

        // find user
        const user = await Usercrate.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // find product
        const product = await Product.findById(productId);
        if (!product || !product.isActive) {
            return NextResponse.json(
                { message: "Product not available" },
                { status: 404 }
            );
        }

        // check if product already in cart
        const cartItem = user.cart.find(
            (item) => item.product.toString() === productId
        );

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            user.cart.push({
                product: productId,
                quantity: 1,
            });
        }

        await user.save();

        return NextResponse.json({
            success: true,
            message: "Product added to cart",
            cart: user.cart,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

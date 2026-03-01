import { NextResponse } from "next/server";
import mongoose from "mongoose"; // 👈 Validation ke liye import karein
import Product from "../../../models/itemlist";
import dbConnect from "../../../lib/mongodb.js";

export async function DELETE(req, { params }) {
    try {
        await dbConnect();

        // Next.js 15+ mein params await karna hota hai
        const { id } = await params;

        console.log('Deleting Product ID:', id);

        // 1. Safety Check: Kya ID MongoDB format mein hai?
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid ID format" },
                { status: 400 }
            );
        }

        // 2. Delete Operation
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json(
                { message: "Product not found in database" },
                { status: 404 }
            );
        }

        // 3. Success Response
        return NextResponse.json({
            success: true,
            message: "Product deleted successfully",
            deletedId: id
        }, { status: 200 });

    } catch (err) {
        console.error("DELETE ERROR:", err);
        return NextResponse.json(
            { message: "Internal Server Error", error: err.message },
            { status: 500 }
        );
    }
}

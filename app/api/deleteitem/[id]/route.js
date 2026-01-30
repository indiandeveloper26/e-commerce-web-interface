import { NextResponse } from "next/server";
import Product from "../../../models/itemlist";

import dbConnect from "../../../lib/mongodb.js";
export async function DELETE(req, { params }) {
    const { id } = await params;
    console.log('iddd', id)

    try {
        await dbConnect();

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Product deleted successfully",
            product: deletedProduct,
        });
    } catch (err) {
        console.error("Delete error:", err);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}



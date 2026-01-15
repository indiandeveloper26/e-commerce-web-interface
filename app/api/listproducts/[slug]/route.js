
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Product from "../../../models/itemlist";


export async function GET(req, { params }) {
    try {
        // ✅ Correctly get slug
        const { slug } = await params;
        console.log('slug:', slug);

        await dbConnect();

        const product = await Product.findOne({ slug });
        console.log('dataaagya', product)

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (err) {
        console.error('error', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
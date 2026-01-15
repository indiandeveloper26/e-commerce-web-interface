
import fs from "fs";
import path from "path";
import Product from "../../models/itemlist";
import dbConnect from "../../lib/mongodb";

export async function POST(req) {
    try {
        const data = await req.formData();

        // Form fields
        const name = data.get("name");
        const slug = data.get("slug");
        const description = data.get("description");
        const shortDescription = data.get("shortDescription");
        const price = parseFloat(data.get("price"));
        const discountPrice = parseFloat(data.get("discountPrice") || 0);
        const currency = data.get("currency") || "INR";
        const category = data.get("category");
        const brand = data.get("brand");
        const stock = parseInt(data.get("stock") || 0);
        const attributes = JSON.parse(data.get("attributes") || "{}");

        // Handle files
        const files = data.getAll("images"); // array of File objects
        const uploadedImages = [];

        if (files.length > 0) {
            const uploadDir = path.join(process.cwd(), "public/uploads");
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const filename = `${Date.now()}-${file.name}`;
                const filepath = path.join(uploadDir, filename);

                fs.writeFileSync(filepath, buffer);
                uploadedImages.push(`/uploads/${filename}`);
            }
        }

        // Save product to MongoDB
        await dbConnect();
        const product = new Product({
            name,
            slug,
            description,
            shortDescription,
            price,
            discountPrice,
            currency,
            category,
            brand,
            stock,
            attributes,
            images: uploadedImages,
            isActive: true,
        });

        await product.save();

        return new Response(JSON.stringify({ success: true, product }), { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
}

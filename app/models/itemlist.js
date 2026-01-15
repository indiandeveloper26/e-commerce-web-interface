import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    comment: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: String,
        shortDescription: String,
        price: Number,
        discountPrice: Number,
        currency: { type: String, default: "INR" },
        images: [String],
        category: String,
        brand: String,
        stock: Number,
        ratings: {
            average: { type: Number, default: 0 },
            count: { type: Number, default: 0 },
        },
        reviews: [ReviewSchema],
        attributes: {
            size: [String],
            color: [String],
            material: String,
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
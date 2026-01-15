import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        price: {
            type: Number, // product ka current price snapshot
            required: true,
        },
    },
    { _id: false }
);


let Cart = mongoose.models.User || mongoose.model("Cart", CartItemSchema);

export default Cart
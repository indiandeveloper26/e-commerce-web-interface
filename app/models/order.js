import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, default: 1 },
                price: { type: Number, required: true }, // snapshot of price
            },
        ],
        totalPrice: { type: Number, required: true },
        address: { type: String, required: true },
        paymentMethod: { type: String, default: "Online" }, // Online / COD
        status: { type: String, default: "Pending" }, // Pending / Paid / Cancelled
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;

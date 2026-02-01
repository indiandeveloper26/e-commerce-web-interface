"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useTheme } from "../Redux/contextapi";

export default function CheckoutPage() {
    const router = useRouter();
    const { theme, userid, setuserid } = useTheme();
    const isDark = theme === "dark";
    const { user } = useSelector((state) => state.auth);
    const userId = user?.userdata?._id;

    const [product, setProduct] = useState(null);
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Online");
    const [loading, setLoading] = useState(true);
    const [id, setsetid] = useState()

    useEffect(() => {

        let dat = async () => {
            let data = localStorage.getItem("id")
            console.log('userid', data)
            setuserid(data)
            setsetid(data)
        }
        dat()
    }, [])

    useEffect(() => {
        const buyProduct = JSON.parse(
            localStorage.getItem("buyNowProduct") || "null"
        );
        if (!buyProduct) {
            toast.error("No product selected!");
            router.push("/products");
            return;
        }
        setProduct(buyProduct);
        setLoading(false);
    }, [router]);

    const handlePlaceOrder = async () => {

        if (!id) {
            toast.error("pls login first");
        }
        console.log('jao')
        if (!address) return toast.error("Please enter shipping address!");
        if (!product) return;

        try {
            const res = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: id,
                    product,
                    quantity: 1,
                    totalPrice: product.price,
                    address,
                    paymentMethod,
                }),
            });
            const data = await res.json();
            console.log(data.order._id)
            if (!res.ok) return toast.error(data.message || "Failed to place order");

            toast.success("Order placed successfully!");

            if (paymentMethod === "Online") {
                // ✅ Navigate to Payment Page with orderId
                router.push(`/payment/${data.order._id}`);
            } else {
                // COD
                toast.info("Payment will be collected on delivery");
                router.push("/orders"); // redirect to user's orders page
            }
        } catch (err) {
            console.log('errr')
        }
    };

    if (loading)
        return (
            <p className={`text-center py-20 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Loading...
            </p>
        );

    return (
        <section className={`min-h-screen py-10 ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Product Info */}
                <div className={`p-6 rounded-xl shadow-md ${isDark ? "bg-gray-800" : "bg-white"}`}>
                    <h1 className="text-2xl font-bold mb-4">Checkout Product</h1>
                    <img
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded mb-4"
                    />
                    <p className={`mb-2 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        {product.description}
                    </p>
                    <p className="text-lg font-bold text-blue-600">Price: ₹{product.price}</p>
                </div>

                {/* Order & Address */}
                <div className={`p-6 rounded-xl shadow-md ${isDark ? "bg-gray-800" : "bg-white"}`}>
                    <h2 className="text-xl font-semibold mb-4">Shipping & Order Summary</h2>

                    {/* Address Input */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Shipping Address</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                            className={`w-full p-3 rounded-lg border focus:outline-none ${isDark ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 border-gray-300"}`}
                            rows={4}
                        ></textarea>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className={`w-full p-3 rounded-lg border focus:outline-none ${isDark ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 border-gray-300"}`}
                        >
                            <option value="Online">Online Payment</option>
                            <option value="COD">Cash on Delivery (COD)</option>
                        </select>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t my-4"></div>
                    <div className="flex justify-between mb-2">
                        <span>{product.name}</span>
                        <span>₹{product.price}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-green-500">₹{product.price}</span>
                    </div>

                    {/* Place Order Button */}
                    <button
                        onClick={handlePlaceOrder}
                        className="mt-6 w-full py-3 rounded-xl font-semibold text-white shadow-lg bg-[#F54D27] hover:bg-[#e04322] transition-colors"
                    >
                        Place Order & {paymentMethod === "Online" ? "Pay" : "Confirm"} →
                    </button>

                </div>

            </div>
        </section>
    );
}

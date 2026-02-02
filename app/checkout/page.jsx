"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTheme } from "../Redux/contextapi";
import { motion } from "framer-motion";
import { MapPin, CreditCard, ShieldCheck, Truck, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const { theme, setuserid } = useTheme();
    const isDark = theme === "dark";

    const [product, setProduct] = useState(null);
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Online");
    const [loading, setLoading] = useState(true);
    const [id, setsetid] = useState("");

    useEffect(() => {
        const storedId = localStorage.getItem("id");
        if (storedId) {
            setuserid(storedId);
            setsetid(storedId);
        }

        const buyProduct = JSON.parse(localStorage.getItem("buyNowProduct") || "null");
        if (!buyProduct) {
            toast.error("No product selected!");
            router.push("/products");
            return;
        }
        setProduct(buyProduct);
        setLoading(false);
    }, [router, setuserid]);

    const handlePlaceOrder = async () => {
        if (!id) return toast.error("Please login first to continue.");
        if (!address) return toast.error("Shipping address is required!");

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
            if (!res.ok) return toast.error(data.message || "Failed to place order");

            toast.success("Order secured successfully!");

            if (paymentMethod === "Online") {
                router.push(`/payment/${data.order._id}`);
            } else {
                toast.info("Order confirmed! Pay on delivery.");
                router.push("/orders");
            }
        } catch (err) {
            toast.error("Network error. Please try again.");
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <div className="w-12 h-12 border-4 border-[#F54D27] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold tracking-widest text-gray-400">SECURE CHECKOUT...</p>
        </div>
    );

    return (
        <section className={`min-h-screen font-sans ${isDark ? "bg-[#0f1115] text-white" : "bg-gray-50 text-gray-900"}`}>
            {/* Minimal Header */}
            <div className={`border-b ${isDark ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white"}`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <button onClick={() => router.back()} className="flex items-center gap-2 font-bold text-sm hover:text-[#F54D27] transition-colors">
                        <ArrowLeft size={18} /> RETURN
                    </button>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-green-500" size={20} />
                        <span className="text-[10px] font-black tracking-widest opacity-60 uppercase">Secure SSL Checkout</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT SIDE: PRODUCT PREVIEW */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className={`p-8 rounded-[2.5rem] shadow-sm ${isDark ? "bg-gray-800" : "bg-white border border-gray-100"}`}>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#F54D27] mb-6">Order Summary</h2>
                            <div className="flex gap-6 items-center mb-8">
                                <div className="relative w-28 h-28 rounded-3xl overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img src={product.images?.[0] || "/placeholder.png"} alt="" className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black italic tracking-tighter uppercase">{product.name}</h3>
                                    <p className="text-sm opacity-50 mt-1 line-clamp-1 font-medium">{product.description}</p>
                                    <div className="mt-2 text-lg font-black tracking-tight">₹{product.price}</div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-dashed border-gray-200/50">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="opacity-50">Subtotal</span>
                                    <span>₹{product.price}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="opacity-50">Shipping</span>
                                    <span className="text-green-500 uppercase text-[10px] font-black">Free</span>
                                </div>
                                <div className="flex justify-between text-2xl font-black pt-4">
                                    <span>Total</span>
                                    <span className="text-[#F54D27]">₹{product.price}</span>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex justify-center gap-8 opacity-40">
                            <Truck size={24} />
                            <CreditCard size={24} />
                            <ShieldCheck size={24} />
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE: FORMS */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7 space-y-6"
                    >
                        <div className={`p-8 md:p-12 rounded-[2.5rem] shadow-2xl ${isDark ? "bg-gray-800 shadow-black/50" : "bg-white border border-gray-100"}`}>

                            {/* Address Section */}
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-[#F54D27] flex items-center justify-center text-white shadow-lg shadow-[#F54D27]/30">
                                        <MapPin size={20} />
                                    </div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Delivery Details</h2>
                                </div>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter full shipping address..."
                                    className={`w-full p-5 rounded-2xl border-2 transition-all outline-none min-h-[120px] font-medium
                                        ${isDark
                                            ? "bg-gray-900 border-gray-700 focus:border-[#F54D27]"
                                            : "bg-gray-50 border-gray-100 focus:border-[#F54D27] focus:bg-white"}`}
                                />
                            </div>

                            {/* Payment Section */}
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white shadow-lg">
                                        <CreditCard size={20} />
                                    </div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Payment Method</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {["Online", "COD"].map((method) => (
                                        <label
                                            key={method}
                                            className={`relative flex flex-col p-5 rounded-2xl border-2 cursor-pointer transition-all
                                            ${paymentMethod === method
                                                    ? "border-[#F54D27] bg-[#F54D27]/5"
                                                    : isDark ? "border-gray-700 bg-gray-900 hover:border-gray-500" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}
                                        >
                                            <input
                                                type="radio"
                                                className="hidden"
                                                name="payment"
                                                value={method}
                                                onChange={() => setPaymentMethod(method)}
                                            />
                                            <span className="font-black text-sm uppercase tracking-widest">{method === "Online" ? "Online Pay" : "Cash on Delivery"}</span>
                                            <span className="text-[10px] mt-1 opacity-50 font-bold">{method === "Online" ? "UPI, Card, Wallet" : "Pay at door"}</span>
                                            {paymentMethod === method && (
                                                <div className="absolute top-3 right-3 w-3 h-3 bg-[#F54D27] rounded-full" />
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full py-6 rounded-3xl bg-[#F54D27] hover:bg-[#e04322] text-white font-black text-lg uppercase tracking-[0.1em] shadow-2xl shadow-[#F54D27]/40 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                <ShoppingBag size={20} />
                                CONFIRM ORDER & PAY
                            </button>
                            <p className="text-center mt-6 text-[10px] font-bold opacity-40 uppercase tracking-widest">
                                By clicking, you agree to our Terms of Service
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
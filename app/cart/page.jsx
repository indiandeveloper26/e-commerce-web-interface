"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../Redux/contextapi";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ShoppingCart } from "lucide-react";
import ProductSkeletonCard from "../componet/skeliton";

export default function CartPage() {
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedId = localStorage.getItem("id");
        if (storedId) setUserId(storedId);
        else {
            setError("Please login to view your cart");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!userId) return;
        const fetchCart = async () => {
            try {
                const res = await fetch("/api/cart/get", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
                setCart(data.cart || []);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [userId]);

    const handleDelete = async (itemId) => {
        try {
            const res = await fetch(`/api/cart/delete/${itemId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Delete failed");
            setCart(cart.filter((item) => item._id !== itemId));
            toast.success("Item removed");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const totalItems = cart.reduce((sum, i) => sum + (i.quantity || 0), 0);
    const totalPrice = cart.reduce((sum, i) => sum + ((i.product?.price || 0) * (i.quantity || 0)), 0);

    if (loading) return <div className="p-10"><ProductSkeletonCard /></div>;

    if (error) return (
        <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#0f1115]" : "bg-gray-50"}`}>
            <p className="text-red-500 font-black uppercase tracking-widest">{error}</p>
        </div>
    );

    return (
        <section className={`min-h-screen py-16 px-4 ${isDark ? "bg-[#0f1115] text-white" : "bg-gray-50 text-gray-900"}`}>
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase">
                        Cart<span className="text-[#F54D27]">.</span>
                        <span className="not-italic text-sm font-bold opacity-30 ml-4 tracking-widest">[{totalItems} ITEMS]</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT: CART ITEMS */}
                    <div className="lg:col-span-8">
                        {cart.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className={`p-20 rounded-[3rem] text-center border-2 border-dashed ${isDark ? "border-gray-800" : "border-gray-200"}`}
                            >
                                <ShoppingCart size={60} className="mx-auto mb-6 opacity-10" />
                                <p className="text-xl font-black italic uppercase opacity-20">Your bag is empty</p>
                                <button onClick={() => router.push('/products')} className="mt-6 text-[#F54D27] font-bold uppercase text-xs tracking-widest border-b-2 border-[#F54D27]">Start Shopping</button>
                            </motion.div>
                        ) : (
                            <div className="space-y-6">
                                <AnimatePresence>
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item._id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className={`relative group rounded-[2.5rem] p-6 flex flex-col sm:flex-row gap-6 items-center transition-all ${isDark ? "bg-gray-800/40 hover:bg-gray-800" : "bg-white shadow-sm hover:shadow-xl"}`}
                                        >
                                            <div className="relative w-32 h-32 rounded-[2rem] overflow-hidden bg-gray-100 flex-shrink-0">
                                                <Image
                                                    src={item.product?.images?.[0] || "/placeholder.png"}
                                                    alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>

                                            <div className="flex-1 text-center sm:text-left">
                                                <h2 className="text-xl font-black italic tracking-tighter uppercase line-clamp-1">{item.product?.name}</h2>
                                                <p className="text-[#F54D27] font-bold text-sm">₹{item.product?.price}</p>

                                                {/* Quantity Control Mockup */}
                                                <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                                                    <div className={`flex items-center gap-4 px-4 py-2 rounded-full border ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                                                        <Minus size={14} className="opacity-40 cursor-pointer" />
                                                        <span className="font-bold text-sm">{item.quantity}</span>
                                                        <Plus size={14} className="text-[#F54D27] cursor-pointer" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center sm:items-end gap-2">
                                                <p className="text-xl font-black italic tracking-tight">₹{item.product?.price * item.quantity}</p>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-3 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: SUMMARY */}
                    <div className="lg:col-span-4">
                        <div className={`sticky top-28 p-10 rounded-[3rem] shadow-2xl ${isDark ? "bg-gray-800 shadow-black" : "bg-white border border-gray-100"}`}>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#F54D27] mb-8">Checkout Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between font-bold">
                                    <span className="opacity-40 uppercase text-[10px] tracking-widest">Total Items</span>
                                    <span>{totalItems}</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span className="opacity-40 uppercase text-[10px] tracking-widest">Shipping</span>
                                    <span className="text-green-500 uppercase text-[10px]">Free</span>
                                </div>
                                <div className="pt-6 border-t border-dashed border-gray-200/50 flex justify-between items-end">
                                    <span className="text-xl font-black italic uppercase">Total</span>
                                    <span className="text-4xl font-black italic text-[#F54D27]">₹{totalPrice}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => router.push("/checkout")}
                                disabled={cart.length === 0}
                                className="group w-full py-6 rounded-3xl bg-gray-900 text-white hover:bg-[#F54D27] disabled:opacity-20 disabled:grayscale transition-all shadow-xl font-black uppercase tracking-widest flex items-center justify-center gap-3"
                            >
                                <ShoppingBag size={20} />
                                Secure Checkout
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-center mt-6 text-[9px] font-bold opacity-30 uppercase tracking-[0.2em]">
                                Taxes calculated at checkout
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
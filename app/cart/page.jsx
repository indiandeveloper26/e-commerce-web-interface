"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTheme } from "../Redux/contextapi";

export default function CartPage() {
    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { user } = useSelector((state) => state.auth);
    const userId = user?.userdata?._id;



    const { theme } = useTheme();
    const isDark = theme === "dark";




    const productpage = (products) => {
        router.push(`products/${products.product.slug
            }`)

    }

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (!userId) {
                    router.push("/login");
                    return;
                }

                const res = await fetch("/api/cart/get", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message);

                setCart(data.cart);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [router, userId]);

    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
    );

    if (loading)
        return (
            <p className={`text-center py-20 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Loading cart...
            </p>
        );

    if (error)
        return (
            <p className="text-center py-20 text-red-500 font-semibold">
                {error}
            </p>
        );

    return (
        <section
            className={`min-h-screen py-10 transition-colors duration-300
        ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
        >
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 🛒 CART ITEMS */}
                <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold mb-6">
                        Shopping Cart
                        <span className={`text-sm font-medium ml-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            ({totalItems} items)
                        </span>
                    </h1>

                    {cart.length === 0 ? (
                        <div className={`${isDark ? "bg-gray-800" : "bg-white"} p-10 rounded-xl shadow text-center`}>
                            <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                                Your cart is empty
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item, index) => (
                                <div onClick={() => productpage(item)}

                                    key={index}
                                    className={`rounded-xl p-4 flex gap-5 transition
                    ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:shadow-md"}`}
                                >
                                    <img
                                        src={item.product.images?.[0] || "/placeholder.png"}
                                        alt={item.product.name}
                                        className="w-28 h-28 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
                                    />

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h2 className="font-semibold text-lg">
                                                {item.product.name}
                                            </h2>
                                            <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>
                                                ₹{item.product.price} × {item.quantity}
                                            </p>
                                        </div>

                                        <span
                                            className={`w-fit px-3 py-1 text-xs font-semibold rounded-full
                        ${isDark
                                                    ? "bg-blue-900 text-blue-300"
                                                    : "bg-blue-100 text-blue-700"}`}
                                        >
                                            Qty: {item.quantity}
                                        </span>
                                    </div>

                                    <div className="text-lg font-bold text-green-500">
                                        ₹{item.product.price * item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 💳 ORDER SUMMARY */}
                <div
                    className={`rounded-xl p-6 h-fit sticky top-24 transition
            ${isDark ? "bg-gray-800" : "bg-white shadow-md"}`}
                >
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    <div className={`flex justify-between mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        <span>Total Items</span>
                        <span>{totalItems}</span>
                    </div>

                    <div className={`flex justify-between mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        <span>Subtotal</span>
                        <span>₹{totalPrice}</span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                            Shipping
                        </span>
                        <span className="text-green-500 font-medium">Free</span>
                    </div>

                    <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>

                    <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-green-500">₹{totalPrice}</span>
                    </div>

                    <button
                        onClick={() => router.push("/checkout")}
                        className="mt-6 w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-green-600 to-green-700
              hover:from-green-700 hover:to-green-800 shadow-lg"
                    >
                        Proceed to Checkout →
                    </button>
                </div>
            </div>
        </section>
    );
}

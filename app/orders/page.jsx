"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useSelector((state) => state.auth);
    const userId = user?.userdata?._id;

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) return;

            setLoading(true);
            try {
                const res = await axios.get(
                    `/api/order/orderdata/${userId}`
                );

                if (res.data.success) {
                    setOrders(res.data.data.orders || []);
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg animate-pulse">Loading orders...</p>
            </div>
        );
    }

    if (!orders.length) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-slate-600">No orders found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
                    >
                        {/* Order Header */}
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-slate-500">
                                #{order._id.slice(-6)}
                            </span>
                            <span
                                className={`text-xs px-3 py-1 rounded-full ${order.status === "Paid"
                                    ? "bg-green-100 text-green-700"
                                    : order.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        {/* Products */}
                        <div className="flex flex-col gap-3 mb-2">
                            {order.products.map(({ product, quantity }, idx) => (
                                <div key={idx} className="flex gap-3 items-center">
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                        <Image
                                            src={product?.images?.[0] || "/placeholder.png"}
                                            alt={product?.name || "Product"}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">{product?.name || "Product"}</p>
                                        <p className="text-sm text-slate-500">
                                            Qty: {quantity} | ₹{product?.price || "-"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <p className="text-lg font-semibold mb-1">
                            Total: ₹{order.totalPrice}
                        </p>

                        {/* Order Time */}
                        <p className="text-xs text-slate-400 mb-3">
                            Ordered at: {new Date(order.createdAt).toLocaleString()}
                        </p>

                        {/* Button with #F54D27 */}
                        <button
                            className="mt-2 w-full py-2 rounded-lg text-white shadow hover:brightness-90 transition"
                            style={{ backgroundColor: "#F54D27" }}
                        >
                            View Order
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

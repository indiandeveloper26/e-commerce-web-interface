"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useSelector((state) => state.auth);
    console.log('user', user.userdata._id)

    const userId = user?.userdata?._id

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = (
                    await axios.get(`http://localhost:3000/api/order/orderdata/${userId}`)
                ).data;

                if (res.orders?.orders) {
                    setOrders(res.orders.orders);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg animate-pulse">Loading orders...</p>
            </div>
        );
    }

    if (orders.length === 0) {
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
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-slate-500">
                                #{order._id.slice(-6)}
                            </span>
                            <span
                                className={`text-xs px-3 py-1 rounded-full
                  ${order.status === "Paid"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        {/* Products */}
                        <div className="flex flex-col gap-3 mb-2">
                            {order.products.map(({ product, quantity }) => (
                                <div key={product._id} className="flex gap-3 items-center">
                                    <img
                                        src={product.images?.[0] || "/placeholder.png"}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <p className="font-medium">{product.name}</p>
                                        <p className="text-sm text-slate-500">
                                            Qty: {quantity} | ₹{product.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-lg font-semibold mb-1">
                            Total: ₹{order.totalPrice}
                        </p>

                        <p className="text-xs text-slate-400 mb-3">
                            Ordered at: {new Date(order.createdAt).toLocaleString()}
                        </p>

                        <button className="mt-2 w-full py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition">
                            View Order
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

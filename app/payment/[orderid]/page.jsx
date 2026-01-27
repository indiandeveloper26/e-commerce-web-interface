"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTheme } from "../../Redux/contextapi";
import axios from "axios";
import { useRazorpay } from "react-razorpay";
import { useSelector } from "react-redux";

export default function PaymentPage() {
    const router = useRouter();
    const { orderid } = useParams();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { Razorpay } = useRazorpay();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const userId = user?.userdata?._id;

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`/api/order/${orderid}`);
                setOrder(data.order);
            } catch (err) {
                toast.error(err.response?.data?.message || err.message || "Failed to fetch order");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderid]);

    const handlePayment = async () => {

        // const paymentRes = (await axios.post("/api/pymnet/crate",)).data

        // console.log(paymentRes)



        if (!order || !userId) {
            toast.error("Order or user not found.");
            return;
        }

        try {
            const paymentRes = await axios.post("/api/pymnet/crate", {
                orderId: order._id,
                amount: order.totalPrice * 100,
            });

            const paymentData = paymentRes.data;

            const options = {
                key: "rzp_test_RqlfH5s7HXQ2nY",
                amount: paymentData.amount,
                currency: "INR",
                name: "My Shop",
                description: `Payment for order ${order._id}`,
                order_id: paymentData.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post(`/api/order/${order._id}/pay`, {
                            userId,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        console.log("Payment verification response:", verifyRes.data);
                        toast.success("Payment Successful!");
                        router.push("/orders");
                    } catch (err) {
                        console.error("Payment verification failed:", err);
                        toast.error(err.response?.data?.message || err.message || "Payment failed");
                    }
                },
                prefill: {
                    name: order.userName || "",
                    email: order.userEmail || "",
                    contact: order.userPhone || "",
                },
                theme: { color: "#059669" }, // green for light mode
            };

            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || err.message || "Payment initiation failed");
        }
    };

    if (loading)
        return (
            <p className={`text-center py-20 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Loading Order...
            </p>
        );

    if (!order)
        return (
            <p className="text-center py-20 text-red-500 font-semibold">
                Order not found!
            </p>
        );

    return (
        <section className={`${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} min-h-screen py-10`}>
            <div
                className={`max-w-3xl mx-auto p-6 rounded-xl shadow-xl ${isDark ? "bg-gray-800" : "bg-white"
                    }`}
            >
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                    Payment for Order #{order._id}
                </h1>

                <div className="space-y-4">
                    {order.products.map((item) => (
                        <div
                            key={item._id}
                            className={`border rounded-lg p-3 ${isDark ? "border-gray-700" : "border-gray-200"
                                } hover:shadow-lg transition-shadow`}
                        >
                            <p><span className="font-semibold">Product:</span> {item.product.name}</p>
                            <p><span className="font-semibold">Quantity:</span> {item.quantity}</p>
                            <p><span className="font-semibold">Price:</span> ₹{item.price}</p>
                        </div>
                    ))}

                    <div className="pt-4 border-t flex flex-col gap-2">
                        <p className="font-semibold text-lg">Total Price: ₹{order.totalPrice}</p>
                        <p><span className="font-semibold">Shipping Address:</span> {order.address}</p>
                        <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
                    </div>
                </div>

                {order.paymentMethod === "Online" && (
                    <button
                        onClick={handlePayment}
                        className="mt-6 w-full py-3 rounded-xl font-semibold text-white bg-[#F54D27] hover:bg-[#e04322] shadow-lg transition-transform transform hover:scale-105"
                    >
                        Pay Now →
                    </button>
                )}

                {order.paymentMethod === "COD" && (
                    <p className="mt-6 font-semibold text-green-600 text-center">
                        Order placed successfully! Payment will be collected on delivery.
                    </p>
                )}
            </div>
        </section>
    );
}

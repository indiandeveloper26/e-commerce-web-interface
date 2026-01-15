"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTheme } from "../../Redux/contextapi";
import axios from "axios";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
export default function PaymentPage() {
    const router = useRouter();
    const { orderid } = useParams();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { error, isLoading, Razorpay } = useRazorpay();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);


    let handler = async (response) => {

        console.log(response)
        // toast.success("Payment successful!");
        // // call server to mark order paid
        // await axios.post(`/api/order/${order._id}/pay`, response);
        // router.push("/orders"); // redirect to user's orders page
    }

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


        try {
            // 1️⃣ Create Razorpay order on server
            const paymentRes = await axios.post("/api/pymnet/crate", {
                orderId: order._id,
                amount: order.totalPrice * 100,
            });
            const paymentData = paymentRes.data;

            // 2️⃣ Open Razorpay checkout
            const options = {
                key: "rzp_test_RqlfH5s7HXQ2nY",
                amount: paymentData.amount,
                currency: "INR",
                name: "My Shop",
                description: `Payment for order ${order._id}`,
                order_id: paymentData.id,
                handler: async function (response) {
                    toast.success("Payment Successful!");

                    // 3️⃣ Verify payment on server
                    await axios.post(`/api/order/${order._id}/pay`, response);

                    router.push("/orders");
                },
                prefill: {
                    name: order.userName || "",
                    email: order.userEmail || "",
                    contact: order.userPhone || "",
                },
                theme: { color: "#059669" },
            };

            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    if (loading)
        return (
            <p className={`text-center py-20 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Loading Order...
            </p>
        );

    if (!order) return <p className="text-center py-20 text-red-500">Order not found!</p>;

    return (
        <section className={`min-h-screen py-10 ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
            <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
                <h1 className="text-2xl font-bold mb-4">Payment for Order #{order._id}</h1>

                <div className="mb-4 space-y-2">
                    {order.products.map((item) => (
                        <div key={item._id} className="border-b pb-2">
                            <p><strong>Product:</strong> {item.product.name}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p><strong>Price:</strong> ₹{item.price}</p>
                        </div>
                    ))}

                    <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                    <p><strong>Shipping Address:</strong> {order.address}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                </div>

                {order.paymentMethod === "Online" && (
                    <button
                        onClick={() => handlePayment()}
                        className="mt-4 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                    >
                        Pay Now →
                    </button>
                )}

                {order.paymentMethod === "COD" && (
                    <p className="mt-4 font-semibold text-green-600">
                        Order placed successfully! Payment will be collected on delivery.
                    </p>
                )}
            </div>
        </section>
    );
}

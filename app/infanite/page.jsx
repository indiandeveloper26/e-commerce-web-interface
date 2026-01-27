// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function OrdersInfinite() {
//     const [orders, setOrders] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);

//     const limit = 10;

//     const fetchOrders = async () => {
//         if (!hasMore || loading) return;

//         setLoading(true); // Loader show immediately

//         try {
//             const res = await axios.get(`/api/limit?page=${page}&limit=${limit}`);
//             const newOrders = res.data.orders;

//             // Delay for UX
//             setTimeout(() => {
//                 setOrders(prev => [...prev, ...newOrders]);

//                 // Update hasMore and page after adding orders
//                 if (orders.length + newOrders.length >= res.data.totalOrders) {
//                     setHasMore(false);
//                 } else {
//                     setPage(prev => prev + 1);
//                 }

//                 setLoading(false); // Loader hide after delay
//             }, 500); // 2 seconds delay
//         } catch (err) {
//             console.error(err);
//             setLoading(false); // hide loader on error too
//         }
//     };

//     // Initial fetch
//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     // Infinite scroll
//     useEffect(() => {
//         const handleScroll = () => {
//             if (
//                 window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
//                 !loading &&
//                 hasMore
//             ) {
//                 fetchOrders();
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [loading, hasMore]);

//     return (
//         <div className="min-h-screen p-6 bg-slate-50">
//             <h1 className="text-3xl font-bold mb-6">My Orders</h1>

//             {orders.map(order => (
//                 <div key={order._id} className="bg-white p-5 rounded-lg shadow mb-4 animate-fadeIn">
//                     <div className="flex justify-between items-center mb-2">
//                         <p className="font-medium">Order #{order._id.slice(-6)}</p>
//                         <span
//                             className={`px-3 py-1 rounded-full text-xs ${order.status === "Paid"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-yellow-100 text-yellow-700"
//                                 }`}
//                         >
//                             {order.status}
//                         </span>
//                     </div>
//                     <p>Total: ₹{order.totalPrice}</p>
//                     <p className="text-sm text-slate-500">Ordered at: {new Date(order.createdAt).toLocaleString()}</p>
//                 </div>
//             ))}

//             {/* Bottom loader */}
//             {/* Bottom loader with circular spinner */}
//             {loading && (
//                 <div className="flex justify-center items-center my-4">
//                     <svg
//                         className="animate-spin h-8 w-8 text-slate-500"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                     >
//                         <circle
//                             className="opacity-25"

//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                         ></circle>
//                         <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                         ></path>
//                     </svg>
//                 </div>
//             )}

//             {/* End message */}
//             {!hasMore && !loading && (
//                 <p className="text-center my-4 text-slate-500">No more orders</p>
//             )}
//         </div>
//     );
// }



import React from 'react'

function page() {
    return (
        <div>page</div>
    )
}

export default page
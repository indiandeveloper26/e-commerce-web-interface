// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts, } from "../Redux/productsSlice";
// import { toast } from "react-toastify";

// export default function page() {
//     const dispatch = useDispatch();
//     const { products, loading, error } = useSelector(
//         (state) => state.products
//     );

//     useEffect(() => {
//         dispatch(fetchProducts());
//     }, [dispatch]);

//     const handleDelete = async (id) => {
//         if (!confirm("Are you sure you want to delete this product?")) return;

//         try {
//             const res = await fetch(`/api/deleteitem/${id}`, {
//                 method: "DELETE",
//             });

//             if (!res.ok) throw new Error("Failed to delete product");

//             // Remove from local state
//             setProducts(products.filter((p) => p._id !== id));
//             toast.success("Product deleted successfully");
//         } catch (err) {
//             toast.error(err.message || "Delete failed");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 px-4 py-10">
//             <div className="max-w-6xl mx-auto">
//                 {/* HEADER */}
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//                     <h1 className="text-3xl font-bold text-gray-800">
//                         Products
//                     </h1>
//                     <p className="text-gray-500 text-sm">
//                         Manage your products
//                     </p>
//                 </div>

//                 {/* STATES */}
//                 {loading && (
//                     <p className="text-center text-gray-500">
//                         Loading products...
//                     </p>
//                 )}

//                 {error && (
//                     <p className="text-center text-red-500">{error}</p>
//                 )}

//                 {!loading && products.length === 0 && (
//                     <p className="text-center text-gray-500">
//                         No products found
//                     </p>
//                 )}

//                 {/* PRODUCTS GRID */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {products.map((item) => (
//                         <div
//                             key={item._id}
//                             className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition"
//                         >
//                             <div>
//                                 <h3 className="text-lg font-semibold text-gray-800">
//                                     {item.title}
//                                 </h3>
//                                 <p className="text-gray-500 mt-1">
//                                     Price: <span className="font-medium">${item.price}</span>
//                                 </p>
//                             </div>

//                             <button
//                                 onClick={() => handleDelete(item._id)}
//                                 className="mt-4 w-full py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }









"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch products from API
    const fetchProducts = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/productdata");
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();
            setProducts(data.data || []);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Delete product
    const handleDelete = async (id) => {

        console.log(id)


        try {
            console.log('apicaliing')
            const res = await fetch(`/api/deleteitem/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete product");

            // Remove from local state
            setProducts(products.filter((p) => p._id !== id));
            toast.success("Product deleted successfully");
        } catch (err) {
            toast.error(err.message || "Delete failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Products
                    </h1>
                    <p className="text-gray-500 text-sm">Manage your products</p>
                </div>

                {/* STATES */}
                {loading && <p className="text-center text-gray-500">Loading products...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && products.length === 0 && <p className="text-center text-gray-500">No products found</p>}

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                <p className="text-gray-500 mt-1">
                                    Price: <span className="font-medium">${item.price}</span>
                                </p>
                            </div>

                            <button
                                onClick={() => handleDelete(item._id)}
                                className="mt-4 w-full py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

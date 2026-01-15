"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsClient() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/productdata", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                setProducts(data.data || []);
            } catch (err) {
                console.error(err);
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading)
        return <p className="text-center py-16 text-gray-500 text-lg">Loading products...</p>;

    if (error)
        return <p className="text-center py-16 text-red-500 text-lg">Error: {error}</p>;

    if (products.length === 0)
        return <p className="text-center py-16 text-gray-500 text-lg">No products available.</p>;

    return (
        <section className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Our Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product._id}
                        onClick={() => router.push(`/products/${product.slug}`)}
                        className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                    >
                        <div className="h-56 w-full relative">
                            <img
                                src={product.images?.[0] || "/placeholder.png"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                            <p className="text-sm text-gray-500 mt-1">{product.category}</p>

                            <div className="mt-auto pt-2">
                                {product.discountPrice ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-blue-700 font-bold text-lg">₹{product.price}</span>
                                        <span className="line-through text-gray-400 text-sm">
                                            ₹{product.discountPrice}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-blue-700 font-bold text-lg">₹{product.price}</span>
                                )}
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/products/${product.slug}`);
                                }}
                                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
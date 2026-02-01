"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setProductsFromStorage } from "../Redux/productsSlice";
import { useRouter } from "next/navigation";
import ProductSlider from "../slider/page";
import ProductSkeletonCard from "../componet/skeliton";

export default function ProductsClient() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { products, loading, error, loaded } = useSelector((state) => state.products);

    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    // Fetch products from API or localStorage
    useEffect(() => {
        const stored = localStorage.getItem("products");
        if (stored) {
            dispatch(setProductsFromStorage(JSON.parse(stored)));
        }
        if (!loaded) {
            dispatch(fetchProducts());
        }
    }, [dispatch, loaded]);

    // Filter products based on search
    useEffect(() => {
        if (!search) return setFiltered(products);
        setFiltered(
            products.filter(
                (p) =>
                    p.name.toLowerCase().includes(search.toLowerCase()) ||
                    (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
            )
        );
    }, [search, products]);

    if (loading)
        return <ProductSkeletonCard />
    if (error) return <p className="text-center py-16 text-red-500 text-lg">Error: {error}</p>;
    if (products.length === 0)
        return <p className="text-center py-16 text-gray-500 text-lg">No products available.</p>;

    return (
        <section className="bg-gray-50 min-h-screen font-sans py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Our Products</h1>

                {/* Search */}
                <div className="flex justify-center mb-8">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                                   focus:outline-none focus:ring-2 focus:ring-[#F54D27] focus:border-[#F54D27]
                                   bg-white text-gray-900 placeholder-gray-400 transition"
                    />
                </div>

                {/* Slider */}
                <ProductSlider />

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {filtered.length > 0 ? (
                        filtered.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => router.push(`/products/${product.slug}`)}
                                className="bg-white border border-gray-200 rounded-lg shadow-md
                                           hover:shadow-xl transform hover:scale-105 transition-all duration-300
                                           cursor-pointer flex flex-col overflow-hidden"
                            >
                                {/* Image */}
                                <div className="h-48 w-full overflow-hidden relative">
                                    <img
                                        src={product.images?.[0] || "/placeholder.png"}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                    />
                                </div>

                                {/* Details */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h2>
                                    <p className="text-sm text-gray-500 mt-1 capitalize">{product.category}</p>

                                    {/* Price */}
                                    <div className="mt-2">
                                        {product.discountPrice ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#F54D27] font-bold text-lg">
                                                    ₹{product.discountPrice}
                                                </span>
                                                <span className="line-through text-gray-400 text-sm">
                                                    ₹{product.price}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-[#F54D27] font-bold text-lg">₹{product.price}</span>
                                        )}
                                    </div>

                                    {/* Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/products/${product.slug}`);
                                        }}
                                        className="mt-4 w-full bg-[#F54D27] text-white py-2 rounded-lg
                                                   hover:bg-[#e04322] transition font-medium text-sm sm:text-base"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-2 text-center text-gray-500 text-lg">
                            No products match your search.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

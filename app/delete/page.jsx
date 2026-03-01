"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setProductsFromStorage } from "../Redux/productsSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../Redux/contextapi";
import ProductSkeletonCard from "../componet/skeliton";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Trash2 } from "lucide-react";
import ProductSlider from "../slider/page";

export default function ProductsClient() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { products, loading, error, loaded } = useSelector(
        (state) => state.products
    );

    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);

    // 🔥 Load products
    useEffect(() => {
        const stored = localStorage.getItem("products");
        if (stored) dispatch(setProductsFromStorage(JSON.parse(stored)));
        if (!loaded) dispatch(fetchProducts());
    }, [dispatch, loaded]);

    // 🚀 fast search (memo)
    const filteredProducts = useMemo(() => {
        if (!search) return products;

        return products.filter(
            (p) =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                (p.category &&
                    p.category.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, products]);

    useEffect(() => {
        setFiltered(filteredProducts);
    }, [filteredProducts]);

    // 🗑️ delete
    const handleDelete = async (e, productId) => {
        e.stopPropagation();

        if (!confirm("Delete this product?")) return;

        try {
            const res = await fetch(`/api/deleteitem/${productId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                const updatedProducts = products.filter((p) => p._id !== productId);
                dispatch(setProductsFromStorage(updatedProducts));
                setFiltered((prev) => prev.filter((p) => p._id !== productId));
            } else {
                const data = await res.json();
                alert(data.message || "Delete failed");
            }
        } catch (err) {
            console.error(err);
            alert("Delete error");
        }
    };

    if (loading) return <ProductSkeletonCard />;

    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 font-bold text-xl">{error}</p>
            </div>
        );

    return (
        <section
            className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#0b0b0c] text-white" : "bg-[#fafafa] text-gray-900"
                }`}
        >
            {/* ================= HERO ================= */}
            <div
                className={`border-b pt-20 pb-14 ${isDark ? "bg-[#111112] border-white/5" : "bg-white border-gray-200"
                    }`}
            >
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                        Curated <span className="text-[#F54D27]">Collections</span>
                    </h1>

                    {/* 🔍 search */}
                    <div className="relative max-w-2xl mx-auto group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search premium products..."
                            className={`w-full pl-16 pr-6 py-5 rounded-full outline-none font-semibold text-sm transition-all
              ${isDark
                                    ? "bg-[#1a1a1c] border border-white/10 focus:border-[#F54D27]"
                                    : "bg-white border border-gray-200 focus:border-[#F54D27]"
                                }`}
                        />
                    </div>
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="container mx-auto px-6 py-16">
                {/* slider */}
                <div className="mb-20">
                    <ProductSlider products={products} />
                </div>

                {/* header */}
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-3xl font-black">
                        Products{" "}
                        <span className="text-[#F54D27]">({filtered.length})</span>
                    </h3>
                </div>

                {/* ================= GRID ================= */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((product, index) => (
                            <motion.div
                                key={product._id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.35 }}
                                onClick={() => router.push(`/products/${product.slug}`)}
                                className={`group cursor-pointer rounded-3xl p-3 backdrop-blur-xl border transition-all duration-300
                ${isDark
                                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:-translate-y-2"
                                        : "bg-white border-gray-200 hover:shadow-2xl hover:-translate-y-2"
                                    }`}
                            >
                                {/* image */}
                                <div className="relative aspect-[1/1.1] rounded-2xl overflow-hidden">
                                    <Image
                                        src={product.images?.[0] || "/placeholder.png"}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                                        priority={index < 2}
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* delete */}
                                    <button
                                        onClick={(e) => handleDelete(e, product._id)}
                                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-500 hover:text-white"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    {/* badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-[#F54D27] text-white text-[10px] px-3 py-1 rounded-full font-bold">
                                            NEW
                                        </span>
                                    </div>
                                </div>

                                {/* info */}
                                <div className="mt-4 px-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] font-bold text-[#F54D27] uppercase">
                                            {product.category || "Premium"}
                                        </span>

                                        <div className="flex items-center gap-1 text-xs opacity-70">
                                            <Star size={12} className="fill-[#F54D27]" />
                                            4.8
                                        </div>
                                    </div>

                                    <h2 className="font-bold text-sm truncate mb-2">
                                        {product.name}
                                    </h2>

                                    <p className="text-lg font-black">
                                        ₹{product.discountPrice || product.price}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* empty */}
                {filtered.length === 0 && (
                    <div className="text-center py-32">
                        <p className="text-3xl font-black opacity-30">
                            No Products Found
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
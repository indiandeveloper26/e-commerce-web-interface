"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setProductsFromStorage } from "../Redux/productsSlice";
import { useRouter } from "next/navigation";
// Updated slider
import ProductSkeletonCard from "../componet/skeliton";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Filter, Star, ArrowUpRight } from "lucide-react";
import ProductSlider from "../slider/page";

export default function ProductsClient() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { products, loading, error, loaded } = useSelector((state) => state.products);

    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("products");
        if (stored) dispatch(setProductsFromStorage(JSON.parse(stored)));
        if (!loaded) dispatch(fetchProducts());
    }, [dispatch, loaded]);

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

    if (loading) return <ProductSkeletonCard />;
    if (error)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-[#F54D27] font-bold text-xl">Oops! {error}</p>
            </div>
        );

    return (
        <section className="bg-white min-h-screen font-sans selection:bg-[#F54D27]/10">
            {/* Header */}
            <div className="bg-[#fafafa] border-b border-gray-100 pt-16 pb-12">
                <div className="container mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4 lowercase">
                            Curated<span className="text-[#F54D27]"> Collections.</span>
                        </h1>
                        <p className="text-gray-500 max-w-lg mx-auto font-medium">
                            Premium essentials designed for the modern lifestyle.
                        </p>
                    </motion.div>

                    {/* Search */}
                    <div className="mt-10 flex justify-center px-4">
                        <div className="relative w-full max-w-2xl group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#F54D27] transition-colors" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products, brands, or categories..."
                                className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] shadow-sm 
                                    focus:outline-none focus:ring-4 focus:ring-[#F54D27]/5 focus:border-[#F54D27]
                                    text-gray-900 font-medium transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Slider Section */}
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black uppercase tracking-widest text-gray-900">Featured Releases</h2>
                        <div className="h-[2px] flex-grow mx-8 bg-gray-50 hidden md:block" />
                    </div>
                    <ProductSlider products={products} />
                </div>

                {/* Grid Header */}
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black text-gray-900">Discover All ({filtered.length})</h3>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-100 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filtered.length > 0 ? (
                            filtered.map((product, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    key={product._id}
                                    onClick={() => router.push(`/products/${product.slug}`)}
                                    className="group relative bg-white flex flex-col cursor-pointer"
                                >
                                    {/* Image */}
                                    <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-gray-100 relative shadow-sm group-hover:shadow-2xl group-hover:shadow-[#F54D27]/10 transition-all duration-500">
                                        <img
                                            src={product.images?.[0] || "/placeholder.png"}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-gray-900 flex items-center gap-1 shadow-sm">
                                                <Star className="w-3 h-3 text-[#F54D27] fill-[#F54D27]" /> 4.9
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                                                <ArrowUpRight className="w-6 h-6 text-[#F54D27]" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="pt-5 px-2">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">{product.category}</h4>
                                        </div>
                                        <h2 className="text-lg font-bold text-gray-900 truncate group-hover:text-[#F54D27] transition-colors">{product.name}</h2>
                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl font-black text-gray-900 italic">₹{product.discountPrice || product.price}</span>
                                                {product.discountPrice && (
                                                    <span className="line-through text-gray-300 text-xs font-bold">₹{product.price}</span>
                                                )}
                                            </div>
                                            <button
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white hover:bg-[#F54D27] transition-all duration-300 shadow-lg active:scale-90"
                                            >
                                                <ShoppingBag className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-gray-400 font-bold text-xl uppercase tracking-widest">No matching items found</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

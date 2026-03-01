"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setProductsFromStorage } from "../Redux/productsSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../Redux/contextapi";
import ProductSkeletonCard from "../componet/skeliton";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Filter, Star, ArrowUpRight } from "lucide-react";
import ProductSlider from "../slider/page";

export default function ProductsClient() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { products, loading, error, loaded } = useSelector((state) => state.products);


    const data = useSelector((state) => state.auth);

    console.log('userdata', data)

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
    if (error) return (
        <div className={`flex flex-col items-center justify-center min-h-screen ${isDark ? "bg-[#0a0a0b]" : "bg-white"}`}>
            <p className="text-[#F54D27] font-black text-2xl uppercase tracking-tighter">Oops! {error}</p>
        </div>
    );

    return (
        <section className={`min-h-screen font-sans selection:bg-[#F54D27]/20 transition-colors duration-500 ${isDark ? "bg-[#0a0a0b] text-white" : "bg-white text-gray-900"}`}>

            {/* --- HERO HEADER --- */}
            <div className={`${isDark ? "bg-[#121214] border-white/5" : "bg-[#fafafa] border-gray-100"} border-b pt-20 pb-16 transition-colors`}>
                <div className="container mx-auto px-6 text-center lg:max-w-4xl"> {/* PC pe header thoda narrow kiya */}
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className={`text-5xl md:text-7xl font-black tracking-tight mb-4 lowercase ${isDark ? "text-white" : "text-gray-900"}`}>
                            Curated<span className="text-[#F54D27]"> Collections.</span>
                        </h1>
                        <p className={`max-w-lg mx-auto font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            Premium essentials designed for the modern lifestyle. Experience the core of quality.
                        </p>
                    </motion.div>

                    {/* Search Container */}
                    <div className="mt-12 flex justify-center px-4">
                        <div className="relative w-full max-w-2xl group">
                            <Search className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDark ? "text-gray-500 group-focus-within:text-white" : "text-gray-400 group-focus-within:text-[#F54D27]"}`} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className={`w-full pl-16 pr-8 py-6 rounded-[2.5rem] shadow-2xl outline-none transition-all duration-300 font-bold text-sm
                                    ${isDark ? "bg-[#1c1c1f] border-white/5 text-white" : "bg-white border-gray-100 shadow-gray-200/50"}`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-6 py-16">

                {/* --- SLIDER SECTION (PC: Balanced Spacing) --- */}
                <div className="mb-24 lg:px-12"> {/* PC par slider ke side mein padding badha di */}
                    <div className="flex flex-col items-center mb-12">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] opacity-40 mb-3">Featured Releases</h2>
                        <div className={`h-[2px] w-20 ${isDark ? "bg-white/10" : "bg-[#F54D27]/20"}`} />
                    </div>

                    {/* Slider is now centered with a clean layout */}
                    <div className="flex justify-center">
                        <ProductSlider products={products} />
                    </div>
                </div>

                {/* --- GRID HEADER --- */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 border-t pt-16 border-gray-100 dark:border-white/5">
                    <h3 className="text-3xl font-black tracking-tighter uppercase italic text-center md:text-left">
                        Discover All <span className="text-[#F54D27] not-italic">({filtered.length})</span>
                    </h3>
                    <button className={`flex items-center gap-2 px-8 py-4 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all
                        ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                        <Filter className="w-4 h-4" /> Filter Catalog
                    </button>
                </div>

                {/* --- PRODUCTS GRID --- */}
                {/* --- PRODUCTS GRID --- */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    <AnimatePresence mode="popLayout">
                        {filtered.length > 0 ? (
                            filtered.map((product, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    key={product._id}
                                    onClick={() => router.push(`/products/${product.slug}`)}
                                    className={`group relative flex flex-col rounded-[2.5rem] p-3 transition-all duration-500 cursor-pointer
                        ${isDark
                                            ? "bg-[#111112] border border-white/5 hover:bg-[#161618] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                                            : "bg-white border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2"
                                        }`}
                                >
                                    {/* Product Image Wrapper */}
                                    <div className="relative aspect-[1/1.1] w-full overflow-hidden rounded-[2rem]">
                                        <Image
                                            src={product.images?.[0] || "/placeholder.png"}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            priority={index < 4} // 👈 above fold boost
                                        />

                                        {/* Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-[#F54D27] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                                New
                                            </span>
                                        </div>

                                        {/* Cart Button */}
                                        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <button className="w-10 h-10 bg-white dark:bg-black rounded-full flex items-center justify-center shadow-2xl hover:bg-[#F54D27] hover:text-white transition-colors">
                                                <ShoppingBag size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Product Details Area */}
                                    <div className="mt-5 px-2 pb-2">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-[#F54D27] opacity-80">
                                                {product.category || "Premium"}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Star size={10} className="fill-[#F54D27] text-[#F54D27]" />
                                                <span className="text-[10px] font-bold opacity-50">4.8</span>
                                            </div>
                                        </div>

                                        <h2 className={`text-sm font-bold truncate mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                                            {product.name}
                                        </h2>

                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/5">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-black tracking-tight leading-none">
                                                    ₹{product.discountPrice || product.price}
                                                </span>
                                                {product.discountPrice && (
                                                    <span className="text-[10px] opacity-30 line-through font-bold">₹{product.price}</span>
                                                )}
                                            </div>

                                            <div className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-lg ${isDark ? "bg-white/5 text-white/40" : "bg-gray-100 text-gray-400"}`}>
                                                Details
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center">
                                <p className="opacity-20 font-black text-4xl uppercase tracking-tighter italic">No Items Found</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
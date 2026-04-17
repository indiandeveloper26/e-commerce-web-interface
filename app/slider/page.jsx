"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "../Redux/contextapi";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export default function ProductSlider({ products = [] }) {
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(4);
    const [isPaused, setIsPaused] = useState(false);

    // Responsive Logic
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerView(2);
            else if (window.innerWidth < 1024) setItemsPerView(3);
            else setItemsPerView(4);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = useCallback(() => {
        const maxIndex = products.length - Math.floor(itemsPerView);
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [products.length, itemsPerView]);

    const prevSlide = () => {
        const maxIndex = products.length - Math.floor(itemsPerView);
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    // Auto Slide with Pause on Hover
    useEffect(() => {
        if (!products.length || isPaused) return;
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [nextSlide, products.length, isPaused]);

    if (!products.length) return null;

    return (
        <div
            className="w-full lg:w-[60%] mx-auto relative group py-8 px-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Viewport Container */}
            <div className="overflow-hidden rounded-[2rem] lg:rounded-[3rem] relative p-1">

                {/* Custom Glass Navigation Buttons */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-30 pointer-events-none">
                    <button
                        onClick={prevSlide}
                        className={`pointer-events-auto p-3 rounded-full backdrop-blur-xl border transition-all duration-300 transform -translate-x-10 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 shadow-2xl
                        ${isDark ? "bg-black/20 border-white/10 text-white hover:bg-white/20" : "bg-white/40 border-gray-200 text-black hover:bg-white/80"}`}
                    >
                        <ChevronLeft size={22} strokeWidth={2.5} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className={`pointer-events-auto p-3 rounded-full backdrop-blur-xl border transition-all duration-300 transform translate-x-10 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 shadow-2xl
                        ${isDark ? "bg-black/20 border-white/10 text-white hover:bg-white/20" : "bg-white/40 border-gray-200 text-black hover:bg-white/80"}`}
                    >
                        <ChevronRight size={22} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Slider Track */}
                <motion.div
                    className="flex"
                    animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        mass: 0.5
                    }}
                >
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="flex-none px-2 mb-2"
                            style={{ width: `${100 / itemsPerView}%` }}
                        >
                            <motion.div
                                whileHover={{ y: -5 }}
                                onClick={() => router.push(`/products/${product.slug}`)}
                                className={`group/card relative aspect-[4/5.5] rounded-[1.8rem] overflow-hidden cursor-pointer transition-all duration-500
                                ${isDark ? "bg-[#0f0f0f] border border-white/5 ring-1 ring-white/5" : "bg-white border border-gray-100 shadow-sm"}`}
                            >
                                <img
                                    src={product.images?.[0] || "/placeholder.png"}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                />

                                {/* Modern Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity duration-500" />

                                {/* Product Info */}
                                <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                                    <div className="flex justify-between items-end gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white text-xs lg:text-sm font-semibold truncate tracking-wide">
                                                {product.name}
                                            </h3>
                                            <p className="text-[#F54D27] text-sm lg:text-base font-bold mt-1 tracking-tighter">
                                                ₹{product.price.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-[#F54D27] p-2 rounded-xl text-white opacity-0 group-hover/card:opacity-100 transition-all duration-500 scale-50 group-hover/card:scale-100 shadow-lg shadow-[#F54D27]/30">
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Premium Minimal Progress Bar */}
            <div className="flex flex-col items-center mt-8 gap-3">
                <div className={`h-[3px] w-32 relative overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                    <motion.div
                        className="absolute h-full bg-gradient-to-r from-[#F54D27] to-[#ff7a5c]"
                        animate={{
                            width: `${(itemsPerView / products.length) * 100}%`,
                            left: `${(currentIndex / products.length) * 100}%`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                </div>
                <span className={`text-[10px] font-medium tracking-[0.2em] uppercase ${isDark ? "text-white/40" : "text-gray-400"}`}>
                    {Math.min(currentIndex + itemsPerView, products.length)} / {products.length}
                </span>
            </div>
        </div>
    );
}
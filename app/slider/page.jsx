"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "../Redux/contextapi";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductSlider({ products = [] }) {
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(4);

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

    // --- AUTO SLIDE LOGIC ---
    useEffect(() => {
        if (!products.length) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 2000); // Har 4 second mein slide hoga

        return () => clearInterval(interval);
    }, [currentIndex, itemsPerView, products.length]);

    const nextSlide = () => {
        if (currentIndex >= products.length - Math.floor(itemsPerView)) {
            setCurrentIndex(0); // Khatam hone par wapas shuru se
        } else {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex <= 0) {
            setCurrentIndex(products.length - Math.floor(itemsPerView));
        } else {
            setCurrentIndex(prev => prev - 1);
        }
    };

    if (!products.length) return null;

    return (
        /* PC par 55% aur Mobile par 100% */
        <div className="w-full lg:w-[55%] mx-auto relative group py-4 transition-all duration-500">

            {/* Viewport Container */}
            <div className="overflow-hidden rounded-[2.5rem] relative">

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-lg
                    ${isDark ? "bg-white/10 text-white border-white/10" : "bg-white/80 text-black border-gray-100"}`}
                >
                    <ChevronLeft size={18} />
                </button>

                <button
                    onClick={nextSlide}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-lg
                    ${isDark ? "bg-white/10 text-white border-white/10" : "bg-white/80 text-black border-gray-100"}`}
                >
                    <ChevronRight size={18} />
                </button>

                {/* Slider Track */}
                <motion.div
                    className="flex"
                    animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
                    transition={{
                        type: "tween",
                        ease: "easeInOut",
                        duration: 1 // --- 1 SECOND SMOOTH TRANSITION ---
                    }}
                >
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="flex-none px-2"
                            style={{ width: `${100 / itemsPerView}%` }}
                        >
                            <div
                                onClick={() => router.push(`/products/${product.slug}`)}
                                className={`group/card relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer shadow-sm
                                ${isDark ? "bg-[#111] border border-white/5" : "bg-gray-50 border border-gray-100"}`}
                            >
                                <img
                                    src={product.images?.[0] || "/placeholder.png"}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                />

                                {/* Info Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                                    <h3 className="text-white text-xs font-bold truncate">{product.name}</h3>
                                    <p className="text-[#F54D27] text-[10px] font-black italic mt-1">₹{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Smooth Progress Indicator */}
            <div className="flex justify-center mt-6">
                <div className={`h-[2px] w-24 relative overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-gray-100"}`}>
                    <motion.div
                        className="absolute h-full bg-[#F54D27]"
                        animate={{
                            width: `${(itemsPerView / products.length) * 100}%`,
                            left: `${(currentIndex / products.length) * 100}%`
                        }}
                        transition={{ duration: 1 }}
                    />
                </div>
            </div>
        </div>
    );
}
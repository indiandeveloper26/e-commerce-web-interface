"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProductSlider({ products = [] }) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(2);

    // Responsive
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

    // Auto-slide
    useEffect(() => {
        if (!products || products.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= products.length - itemsPerView ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [products, itemsPerView]);

    if (!products || products.length === 0) return null;

    return (
        <div className="overflow-hidden rounded-2xl">
            <motion.div
                className="flex"
                animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
                transition={{ type: "tween", duration: 0.8, ease: "easeInOut" }}
            >
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="flex-none px-2"
                        style={{ width: `${100 / itemsPerView}%` }}
                    >
                        <div
                            onClick={() => router.push(`/products/${product.slug}`)}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="aspect-[4/5] w-full overflow-hidden relative">
                                <img
                                    src={product.images?.[0] || "/placeholder.png"}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-sm font-bold truncate">{product.name}</h3>
                                <p className="text-[#F54D27] font-black mt-1">₹{product.discountPrice || product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

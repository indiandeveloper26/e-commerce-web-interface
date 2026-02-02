"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function FastAutoSlider() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [isHovered, setIsHovered] = useState(false);

    // Initial Data Fetch
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerView(1.5);
            else if (window.innerWidth < 1024) setItemsPerView(2);
            else setItemsPerView(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        fetch("/api/productdata")
            .then((res) => res.json())
            .then((data) => setProducts(data.data || []))
            .catch(() => {
                // Dummy data if API fails
                setProducts(Array(8).fill(null).map((_, i) => ({
                    _id: `${i}`,
                    name: `Flash Item ${i + 1}`,
                    price: 999 + i * 100,
                    images: ["/placeholder.png"],
                    slug: "product-link"
                })));
            });

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 0.5 SECOND AUTO-SLIDE LOGIC
    const maxIndex = products.length > 0 ? products.length - Math.ceil(itemsPerView) : 0;

    useEffect(() => {
        if (isHovered || products.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 1000); // 0.5 Seconds

        return () => clearInterval(interval);
    }, [maxIndex, isHovered, products.length]);

    return (
        <div
            className="w-full max-w-7xl mx-auto py-6 px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center gap-3 mb-6 px-2">
                <div className="flex items-center gap-2 bg-[#F54D27]/10 px-3 py-1 rounded-full">
                    <Zap size={14} className="text-[#F54D27] fill-[#F54D27]" />
                    <span className="text-[#F54D27] font-black text-[10px] uppercase tracking-widest">Live Feed</span>
                </div>
                <div className="h-[1px] flex-grow bg-gray-100"></div>
            </div>

            <div className="overflow-hidden rounded-[2rem]">
                <motion.div
                    className="flex"
                    animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
                    transition={{
                        type: "spring",
                        stiffness: 500, // Instant snap
                        damping: 50,   // No shaking
                        mass: 0.9      // Very light feel
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
                                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-50 shadow-sm hover:border-[#F54D27] transition-colors duration-200"
                            >
                                <div className="aspect-[4/3] bg-gray-50 relative">
                                    <img
                                        src={product.images[0]}
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                    {/* Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#F54D27]">
                                            <Zap size={20} fill="#F54D27" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white">
                                    <h3 className="font-bold text-gray-900 text-sm truncate uppercase tracking-tighter">
                                        {product.name}
                                    </h3>
                                    <p className="text-[#F54D27] font-black italic mt-1 text-sm">₹{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
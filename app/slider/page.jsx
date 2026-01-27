"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ProductSlider() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerSlide(2);
            else setItemsPerSlide(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/productdata", { cache: "no-store" });
                const data = await res.json();
                setProducts(data.data || []);
            } catch {
                setProducts([
                    { _id: "1", name: "Stylish T-Shirt", category: "Clothing", price: 799, discountPrice: 699, images: ["/placeholder.png"], slug: "stylish-tshirt" },
                    { _id: "2", name: "Cool Sneakers", category: "Footwear", price: 2999, images: ["/placeholder.png"], slug: "cool-sneakers" },
                    { _id: "3", name: "Smart Watch", category: "Electronics", price: 4999, discountPrice: 4499, images: ["/placeholder.png"], slug: "smart-watch" },
                ]);
            }
        };
        fetchProducts();
    }, []);

    const totalSlides = Math.ceil(products.length / itemsPerSlide);
    const nextSlide = () => setCurrentIndex((p) => (p + 1) % totalSlides);
    const prevSlide = () => setCurrentIndex((p) => (p - 1 + totalSlides) % totalSlides);

    useEffect(() => {
        const i = setInterval(nextSlide, 3000);
        return () => clearInterval(i);
    }, [totalSlides]);

    return (
        <div className="relative lg:w-[50%] py-8 mx-auto">
            {/* Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2
                p-2 bg-white border-2 border-[#F54D27]
                rounded-full shadow-md hover:shadow-lg
                hover:bg-[#F54D27]/10 transition z-10"
            >
                <FaChevronLeft className="text-[#F54D27]" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2
                p-2 bg-white border-2 border-[#F54D27]
                rounded-full shadow-md hover:shadow-lg
                hover:bg-[#F54D27]/10 transition z-10"
            >
                <FaChevronRight className="text-[#F54D27]" />
            </button>

            {/* Slider */}
            <div className="overflow-hidden w-full">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${(currentIndex * 100) / totalSlides}%)` }}
                >
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="flex-none px-2 cursor-pointer"
                            style={{ width: window.innerWidth < 640 ? "50%" : "33.33%" }}
                            onClick={() => router.push(`/products/${product.slug}`)}
                        >
                            {/* CARD */}
                            <div
                                className="
                                bg-white
                                border-2 border-[#F54D27]
                                hover:border-4 hover:border-[#F54D27]
                                rounded-xl
                                shadow-lg hover:shadow-2xl
                                transform hover:scale-105
                                transition-all
                                flex flex-col
                                "
                            >
                                <div className="h-40 w-full overflow-hidden rounded-t-xl">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover hover:scale-110 transition"
                                    />
                                </div>

                                <div className="p-3 flex flex-col flex-grow">
                                    <h3 className="font-semibold truncate">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {product.category}
                                    </p>

                                    <div className="mt-auto pt-2">
                                        <span className="text-[#F54D27] font-bold text-lg">
                                            ₹{product.discountPrice || product.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-5 gap-3">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-4 h-4 rounded-full border-2 border-[#F54D27]
                            ${currentIndex === idx ? "bg-[#F54D27]" : "bg-transparent"}
                        `}
                    />
                ))}
            </div>
        </div>
    );
}

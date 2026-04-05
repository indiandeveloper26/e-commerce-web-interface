"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProducts } from "../../Redux/productsSlice";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, Zap, ShieldCheck, Truck, Star } from "lucide-react";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const [id, setid] = useState("");
    const [activeImage, setActiveImage] = useState(0);

    const { products, loading, error } = useSelector((state) => state.products);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [product, setProduct] = useState(null);
    const [adding, setAdding] = useState(false);

    // Get User ID from Storage
    useEffect(() => {
        const data = localStorage.getItem("id");
        if (data) setid(data);
    }, []);

    // Sync Product from Redux
    useEffect(() => {
        if (products.length > 0) {
            const found = products.find((p) => p.slug === params.slug);
            if (found) {
                setProduct(found);
            } else {
                dispatch(fetchProducts());
            }
        } else {
            dispatch(fetchProducts());
        }
    }, [products, params.slug, dispatch]);

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            toast.error("Please login first");
            return;
        }
        setAdding(true);
        try {
            const res = await fetch("/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: id, productId: product._id }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to add to cart");
            toast.success("Successfully added to cart");
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setAdding(false);
        }
    };

    const handleBuyNow = () => {
        if (!isLoggedIn) {
            toast.error("Please login first");
            return;
        }
        localStorage.setItem("buyNowProduct", JSON.stringify(product));
        router.push("/checkout");
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F54D27]"></div>
        </div>
    );

    if (!product) return <div className="text-center py-20 font-bold text-gray-400 uppercase">Product Not Found</div>;

    return (
        <section className="bg-white min-h-screen pb-20 selection:bg-[#F54D27]/10">
            {/* Header / Breadcrumb */}
            <div className="border-b border-gray-100 bg-gray-50/50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft size={16} /> BACK TO STORE
                    </button>
                    <div className="flex items-center gap-1 text-[10px] font-black tracking-widest text-gray-400">
                        HOME / {product.category?.toUpperCase()} / {product.name?.toUpperCase()}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT: IMAGE GALLERY (7 Columns) */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Thumbnails */}
                        <div className="md:col-span-2 order-2 md:order-1 flex md:flex-col gap-3">
                            {product.images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all 
                                    ${activeImage === idx ? "border-[#F54D27] scale-105 shadow-md" : "border-gray-100 opacity-60 hover:opacity-100"}`}
                                >
                                    <Image src={img} alt="thumb" fill className="object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="md:col-span-10 order-1 md:order-2 relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 shadow-sm"
                        >
                            <Image
                                src={product.images?.[activeImage] || "/placeholder.png"}
                                alt={product.name}
                                fill
                                className="object-cover hover:scale-110 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase text-gray-900 shadow-sm flex items-center gap-2">
                                    <Star size={12} className="text-[#F54D27] fill-[#F54D27]" /> 4.9 (120 Reviews)
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: PRODUCT INFO (5 Columns) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
                        <div>
                            <span className="text-[#F54D27] font-black text-xs uppercase tracking-[0.3em] mb-2 block">
                                {product.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4 lowercase">
                                {product.name}<span className="text-[#F54D27]">.</span>
                            </h1>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                {product.description || "A masterclass in modern design and premium materials. Engineered for those who value both style and uncompromising functionality."}
                            </p>
                        </div>

                        <div className="flex items-end gap-4">
                            <span className="text-4xl font-black text-gray-900 italic">
                                ₹{product.price}
                            </span>
                            {product.discountPrice && (
                                <span className="text-xl text-gray-300 line-through font-bold mb-1">
                                    ₹{product.discountPrice}
                                </span>
                            )}
                            <div className="mb-1 bg-green-50 text-green-600 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter">
                                In Stock
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Truck size={18} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Fast Delivery</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <ShieldCheck size={18} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Original</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Zap size={18} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Flash Sale</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={adding}
                                    className={`flex-[2] flex items-center justify-center gap-3 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm transition-all shadow-xl active:scale-95
                                    ${adding ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-900 text-white hover:bg-black shadow-gray-200"}`}
                                >
                                    <ShoppingBag size={18} /> {adding ? "ADDING..." : "ADD TO CART"}
                                </button>
                                <button className="flex-1 border-2 border-gray-100 rounded-[1.5rem] flex items-center justify-center hover:bg-gray-50 transition-colors">
                                    <Zap size={20} className="text-gray-400 group-hover:text-[#F54D27]" />
                                </button>
                            </div>

                            <button
                                onClick={handleBuyNow}
                                className="w-full py-5 bg-[#F54D27] text-white rounded-[1.5rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-[#F54D27]/20 hover:bg-[#e04322] transition-all active:scale-95"
                            >
                                BUY IT NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
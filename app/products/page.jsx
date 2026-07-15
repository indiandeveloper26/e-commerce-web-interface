"use client";

import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setProductsFromStorage } from "../Redux/productsSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../Redux/contextapi";
import ProductSkeletonCard from "../componet/skeliton";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    ShoppingBag,
    SlidersHorizontal,
    Star,
    ChevronDown,
    X,
    Flame,
    Tag,
    ArrowUpRight,
    Filter,
    Grid3x3,
    LayoutGrid,
    List,
} from "lucide-react";
import ProductSlider from "../slider/page";

export default function ProductsClient() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { products, loading, error, loaded } = useSelector(
        (state) => state.products
    );

    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [showSort, setShowSort] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [viewMode, setViewMode] = useState("grid"); // grid | list

    // Fetch products
    useEffect(() => {
        const stored = localStorage.getItem("products");
        if (stored) dispatch(setProductsFromStorage(JSON.parse(stored)));
        if (!loaded) dispatch(fetchProducts());
    }, [dispatch, loaded]);

    // Build categories dynamically from products
    const categories = useMemo(() => {
        const cats = products.map((p) => p.category).filter(Boolean);
        return ["All", ...new Set(cats)];
    }, [products]);

    // Filter + Sort logic
    useEffect(() => {
        let result = [...products];

        if (activeCategory !== "All") {
            result = result.filter((p) => p.category === activeCategory);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name?.toLowerCase().includes(q) ||
                    p.category?.toLowerCase().includes(q)
            );
        }

        if (sortBy === "price_asc") {
            result.sort(
                (a, b) =>
                    (a.discountPrice || a.price) - (b.discountPrice || b.price)
            );
        } else if (sortBy === "price_desc") {
            result.sort(
                (a, b) =>
                    (b.discountPrice || b.price) - (a.discountPrice || a.price)
            );
        } else if (sortBy === "name_asc") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "discount") {
            result.sort((a, b) => {
                const discA = a.discountPrice
                    ? Math.round(((a.price - a.discountPrice) / a.price) * 100)
                    : 0;
                const discB = b.discountPrice
                    ? Math.round(((b.price - b.discountPrice) / b.price) * 100)
                    : 0;
                return discB - discA;
            });
        }

        setFiltered(result);
    }, [search, products, activeCategory, sortBy]);

    const toggleWishlist = (e, id) => {
        e.stopPropagation();
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const getDiscount = (p) =>
        p.discountPrice && p.price
            ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
            : null;

    const sortLabels = {
        default: "Default",
        price_asc: "Price: Low to High",
        price_desc: "Price: High to Low",
        name_asc: "Name: A–Z",
        discount: "Best Discount",
    };

    if (loading) return <ProductSkeletonCard />;
    if (error)
        return (
            <div
                className={`flex flex-col items-center justify-center min-h-screen px-4 ${isDark ? "bg-[#0a0a0b]" : "bg-white"
                    }`}
            >
                <p className="text-[#F54D27] font-black text-xl sm:text-2xl uppercase tracking-tighter">
                    Oops! {error}
                </p>
            </div>
        );

    return (
        <section
            className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? "bg-[#0a0a0b] text-white" : "bg-white text-gray-900"
                }`}
        >
            {/* ── HERO HEADER ── */}
            <div
                className={`border-b pt-16 sm:pt-20 pb-10 sm:pb-14 transition-colors ${isDark
                    ? "bg-[#111113] border-white/5"
                    : "bg-[#fafafa] border-gray-100"
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Eyebrow */}
                        <div className="text-center">
                            <span
                                className={`inline-block text-[8px] sm:text-[10px] font-black uppercase tracking-[0.35em] mb-3 sm:mb-4 ${isDark ? "text-white/30" : "text-gray-400"
                                    }`}
                            >
                                Premium Store
                            </span>

                            <h1
                                className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-3 sm:mb-4 lowercase ${isDark ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                Curated
                                <span className="text-[#F54D27]"> Collections.</span>
                            </h1>

                            <p
                                className={`max-w-sm mx-auto text-xs sm:text-sm font-medium mb-6 sm:mb-10 ${isDark ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                Premium essentials designed for the modern lifestyle.
                            </p>
                        </div>

                        {/* Search Bar - Responsive */}
                        <div className="flex justify-center px-2 sm:px-4">
                            <div className="relative w-full max-w-xl group">
                                <Search
                                    className={`absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDark
                                        ? "text-gray-500 group-focus-within:text-white"
                                        : "text-gray-400 group-focus-within:text-[#F54D27]"
                                        }`}
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products or categories..."
                                    className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 rounded-2xl outline-none transition-all duration-300 text-sm font-medium border
                    ${isDark
                                            ? "bg-[#1c1c1f] border-white/8 text-white placeholder:text-white/25 focus:border-white/20"
                                            : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#F54D27]/50 shadow-sm"
                                        }`}
                                />
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-7xl">

                {/* ── FEATURED BANNER ── */}
                {products.length > 0 && (
                    <div className="mb-12 sm:mb-16">
                        <div className="flex items-center gap-3 mb-4 sm:mb-5">
                            <Flame className="w-4 h-4 text-[#F54D27]" />
                            <span
                                className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.35em] ${isDark ? "text-white/30" : "text-gray-400"
                                    }`}
                            >
                                Featured Drop
                            </span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            onClick={() =>
                                router.push(`/products/${products[0].slug}`)
                            }
                            className={`flex flex-col sm:flex-row gap-0 rounded-2xl sm:rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 group
                ${isDark
                                    ? "bg-[#111113] border-white/8 hover:border-white/20"
                                    : "bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md"
                                }`}
                        >
                            {/* Image - Responsive */}
                            <div
                                className={`sm:w-48 md:w-56 lg:w-64 aspect-square sm:aspect-square relative overflow-hidden flex-shrink-0 ${isDark ? "bg-[#1a1a1c]" : "bg-gray-50"
                                    }`}
                            >
                                <Image
                                    src={products[0].images?.[0] || "/placeholder.png"}
                                    alt={products[0].name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {getDiscount(products[0]) && (
                                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                                        <span className="bg-[#F54D27] text-white text-[7px] sm:text-[9px] font-black px-2 sm:px-3 py-1 rounded-full uppercase tracking-widest">
                                            −{getDiscount(products[0])}%
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Info - Responsive */}
                            <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8 gap-2 sm:gap-3">
                                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-[#F54D27]">
                                    {products[0].category || "New Arrival"}
                                </span>
                                <h2
                                    className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"
                                        }`}
                                >
                                    {products[0].name}
                                </h2>
                                <p
                                    className={`text-xs sm:text-sm max-w-sm leading-relaxed line-clamp-2 sm:line-clamp-3 ${isDark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    {products[0].description ||
                                        "Premium quality, crafted for the modern individual."}
                                </p>
                                <div className="flex items-center gap-3 sm:gap-4 mt-1 sm:mt-2">
                                    <span className="text-2xl sm:text-3xl font-black">
                                        ₹
                                        {(
                                            products[0].discountPrice || products[0].price
                                        ).toLocaleString()}
                                    </span>
                                    {products[0].discountPrice && (
                                        <span
                                            className={`text-xs sm:text-sm line-through font-bold ${isDark ? "opacity-30" : "opacity-40"
                                                }`}
                                        >
                                            ₹{products[0].price.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/products/${products[0].slug}`);
                                        }}
                                        className="flex items-center gap-2 bg-[#F54D27] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:opacity-90 transition-opacity mt-1 sm:mt-2 w-fit"
                                    >
                                        Shop Now <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* ── PRODUCT SLIDER ── */}
                {products.length > 1 && (
                    <div className="mb-12 sm:mb-16">
                        <div className="flex flex-col items-center mb-6 sm:mb-8 gap-2">
                            <span
                                className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? "opacity-30" : "opacity-40"
                                    }`}
                            >
                                Trending Now
                            </span>
                            <div
                                className={`h-[2px] w-12 sm:w-16 ${isDark ? "bg-white/10" : "bg-[#F54D27]/20"
                                    }`}
                            />
                        </div>
                        <ProductSlider products={products} />
                    </div>
                )}

                {/* ── TOOLBAR: Categories + Sort ── */}
                <div
                    className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b ${isDark ? "border-white/5" : "border-gray-100"
                        }`}
                >
                    {/* Category Chips - Scrollable on mobile */}
                    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest border whitespace-nowrap transition-all duration-200
                  ${activeCategory === cat
                                        ? "bg-[#F54D27] text-white border-[#F54D27]"
                                        : isDark
                                            ? "border-white/10 text-white/40 hover:border-white/25 hover:text-white/60"
                                            : "border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort + Count + View Mode */}
                    <div className="flex items-center gap-2 sm:gap-4 w-full md:w-auto justify-between md:justify-end">
                        <span
                            className={`text-[10px] sm:text-xs font-bold ${isDark ? "text-white/30" : "text-gray-400"
                                }`}
                        >
                            {filtered.length} items
                        </span>

                        {/* View Mode Toggle - Hidden on mobile */}
                        <div className="hidden sm:flex items-center gap-1 border rounded-full p-0.5">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-1.5 rounded-full transition ${viewMode === "grid"
                                    ? isDark ? "bg-white/10" : "bg-gray-100"
                                    : "opacity-40 hover:opacity-80"
                                    }`}
                            >
                                <Grid3x3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-1.5 rounded-full transition ${viewMode === "list"
                                    ? isDark ? "bg-white/10" : "bg-gray-100"
                                    : "opacity-40 hover:opacity-80"
                                    }`}
                            >
                                <List className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSort((v) => !v)}
                                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-[8px] sm:text-[10px] font-black uppercase tracking-widest transition-all
                  ${isDark
                                        ? "border-white/10 text-white/50 hover:bg-white/5"
                                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                <SlidersHorizontal className="w-3 h-3" />
                                <span className="hidden xs:inline">{sortLabels[sortBy]}</span>
                                <span className="xs:hidden">Sort</span>
                                <ChevronDown
                                    className={`w-3 h-3 transition-transform ${showSort ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {showSort && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 4 }}
                                        className={`absolute right-0 top-10 z-50 w-48 sm:w-52 rounded-2xl border shadow-2xl overflow-hidden
                      ${isDark
                                                ? "bg-[#1a1a1c] border-white/10"
                                                : "bg-white border-gray-100"
                                            }`}
                                    >
                                        {Object.entries(sortLabels).map(([key, label]) => (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setSortBy(key);
                                                    setShowSort(false);
                                                }}
                                                className={`w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors
                          ${sortBy === key
                                                        ? "text-[#F54D27]"
                                                        : isDark
                                                            ? "text-white/50 hover:text-white hover:bg-white/5"
                                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* ── PRODUCTS GRID / LIST ── */}
                <div className={`grid ${viewMode === "list"
                    ? "grid-cols-1"
                    : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    } gap-3 sm:gap-4 md:gap-5 xl:gap-6`}>
                    <AnimatePresence mode="popLayout">
                        {filtered.length > 0 ? (
                            filtered.map((product, index) => {
                                const discount = getDiscount(product);
                                const isWished = wishlist.includes(product._id);
                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, delay: index * 0.03 }}
                                        key={product._id}
                                        onClick={() =>
                                            router.push(`/products/${product.slug}`)
                                        }
                                        className={`group relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border transition-all duration-300
                      ${viewMode === "list" ? "flex-row" : ""}
                      ${isDark
                                                ? "bg-[#111113] border-white/5 hover:border-white/15 hover:bg-[#161618]"
                                                : "bg-white border-gray-100 hover:border-gray-200 hover:-translate-y-1 shadow-sm hover:shadow-md"
                                            }`}
                                    >
                                        {/* Image */}
                                        <div
                                            className={`relative overflow-hidden ${viewMode === "list"
                                                ? "w-32 sm:w-48 h-32 sm:h-48 flex-shrink-0"
                                                : "aspect-square w-full"
                                                } ${isDark ? "bg-[#1a1a1c]" : "bg-gray-50"
                                                }`}
                                        >
                                            <Image
                                                src={product.images?.[0] || "/placeholder.png"}
                                                alt={product.name}
                                                fill
                                                sizes={viewMode === "list"
                                                    ? "150px"
                                                    : "(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                                                }
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                priority={index < 4}
                                            />

                                            {discount && (
                                                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                                                    <span className="bg-[#F54D27] text-white text-[7px] sm:text-[9px] font-black px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-widest">
                                                        −{discount}%
                                                    </span>
                                                </div>
                                            )}

                                            <button
                                                onClick={(e) => toggleWishlist(e, product._id)}
                                                className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200
                          ${isWished
                                                        ? "bg-[#F54D27] text-white"
                                                        : isDark
                                                            ? "bg-black/40 text-white/60 hover:bg-black/60"
                                                            : "bg-white/80 text-gray-400 hover:bg-white hover:text-[#F54D27]"
                                                    }`}
                                            >
                                                <svg
                                                    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                                                    viewBox="0 0 24 24"
                                                    fill={isWished ? "currentColor" : "none"}
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                </svg>
                                            </button>

                                            {/* Quick add button (hover) */}
                                            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 translate-y-2 sm:translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    className="w-full bg-[#F54D27] text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest py-2 sm:py-2.5 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 hover:opacity-90 transition-opacity"
                                                >
                                                    <ShoppingBag className="w-3 h-3" />
                                                    <span className="hidden xs:inline">Add to Cart</span>
                                                    <span className="xs:hidden">Add</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className={`p-3 sm:p-4 flex flex-col gap-1 sm:gap-1.5 ${viewMode === "list" ? "flex-1 justify-center" : ""
                                            }`}>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-[#F54D27]">
                                                    {product.category || "Premium"}
                                                </span>
                                                <div className="flex items-center gap-0.5">
                                                    <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-[#F54D27] text-[#F54D27]" />
                                                    <span
                                                        className={`text-[8px] sm:text-[10px] font-bold ${isDark ? "text-white/40" : "text-gray-400"
                                                            }`}
                                                    >
                                                        4.8
                                                    </span>
                                                </div>
                                            </div>

                                            <h2
                                                className={`text-xs sm:text-sm font-bold leading-snug ${viewMode === "list" ? "line-clamp-1" : "line-clamp-2"
                                                    } ${isDark ? "text-white" : "text-gray-900"
                                                    }`}
                                            >
                                                {product.name}
                                            </h2>

                                            {viewMode === "list" && (
                                                <p className={`text-[10px] sm:text-xs line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-500"
                                                    }`}>
                                                    {product.description || "Premium quality product"}
                                                </p>
                                            )}

                                            <div
                                                className={`flex items-center justify-between mt-0.5 sm:mt-1 pt-2 sm:pt-3 border-t ${isDark ? "border-white/5" : "border-gray-100"
                                                    }`}
                                            >
                                                <div>
                                                    <span className={`font-black ${viewMode === "list" ? "text-sm sm:text-base" : "text-xs sm:text-base"
                                                        }`}>
                                                        ₹
                                                        {(
                                                            product.discountPrice || product.price
                                                        ).toLocaleString()}
                                                    </span>
                                                    {product.discountPrice && (
                                                        <span
                                                            className={`text-[8px] sm:text-[10px] ml-1 line-through font-bold ${isDark ? "opacity-25" : "opacity-35"
                                                                }`}
                                                        >
                                                            ₹{product.price.toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                                <span
                                                    className={`text-[7px] sm:text-[9px] font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg ${isDark
                                                        ? "bg-white/5 text-white/30"
                                                        : "bg-gray-100 text-gray-400"
                                                        }`}
                                                >
                                                    Details
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="col-span-full py-20 sm:py-32 text-center">
                                <Tag
                                    className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4 ${isDark ? "opacity-10" : "opacity-20"
                                        }`}
                                />
                                <p
                                    className={`font-black text-2xl sm:text-3xl uppercase tracking-tight italic ${isDark ? "opacity-10" : "opacity-20"
                                        }`}
                                >
                                    No Items Found
                                </p>
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setActiveCategory("All");
                                    }}
                                    className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#F54D27] hover:underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── LOAD MORE ── */}
                {filtered.length > 8 && (
                    <div className="text-center mt-10 sm:mt-14">
                        <button
                            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all
                            ${isDark
                                    ? "border-white/10 text-white/50 hover:bg-white/5 hover:text-white/80"
                                    : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                }`}
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
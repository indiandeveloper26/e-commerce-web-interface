"use client";

import { useTheme } from "../Redux/contextapi";
import { ShoppingBag, Heart } from "lucide-react";

export default function LoadingProductSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Shimmer Layer: Har element ke andar ki chamak
    const Shimmer = ({ className }) => (
        <div className={`relative overflow-hidden rounded-xl ${isDark ? "bg-white/[0.05]" : "bg-gray-100"} ${className}`}>
            <div className="absolute inset-0 -translate-x-full animate-shimmer-fast bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
    );

    return (
        <div className={`
            relative group rounded-[2.5rem] p-4 border transition-all duration-500 overflow-hidden
            ${isDark
                ? "bg-[#0a0a0c] border-white/[0.05] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"}
        `}>

            {/* --- SCANNING EFFECT (Ye dikhayega ki product load ho raha hai) --- */}
            {isDark && (
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-20">
                    <div className="absolute w-full h-20 bg-gradient-to-b from-transparent via-emerald-500 to-transparent -rotate-12 animate-scan-slow" />
                </div>
            )}

            {/* 1. Image Area with "Loading" vibe */}
            <div className={`relative h-72 w-full rounded-[2.2rem] overflow-hidden ${isDark ? "bg-white/[0.02]" : "bg-gray-50"}`}>
                <Shimmer className="h-full w-full" />

                {/* Floating Heart Placeholder */}
                <div className="absolute top-4 right-4 h-11 w-11 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/5">
                    <Heart size={18} className="text-white/10" />
                </div>
            </div>

            {/* 2. Content Details */}
            <div className="mt-6 px-2 space-y-4">

                {/* Category Pill */}
                <Shimmer className="h-4 w-24 rounded-full opacity-60" />

                {/* Title Lines (Staggered widths) */}
                <div className="space-y-2.5">
                    <Shimmer className="h-5 w-full" />
                    <Shimmer className="h-5 w-[70%]" />
                </div>

                {/* Info Row (Size/Stock) */}
                <div className="flex gap-2 py-1">
                    <Shimmer className="h-8 w-12" />
                    <Shimmer className="h-8 w-12" />
                    <Shimmer className="h-8 w-12" />
                </div>

                {/* 3. Price & Action Area */}
                <div className="flex justify-between items-center pt-4 border-t border-dashed border-white/10">
                    <div className="space-y-2">
                        <Shimmer className="h-8 w-28 rounded-lg" />
                        <Shimmer className="h-3 w-16 rounded-md opacity-40" />
                    </div>

                    {/* Cart Button Placeholder with Glow */}
                    <div className={`
                        h-14 w-14 rounded-[1.2rem] flex items-center justify-center relative
                        ${isDark ? "bg-emerald-500/5 border border-emerald-500/20" : "bg-emerald-50"}
                    `}>
                        <ShoppingBag size={22} className="text-emerald-500/20" />
                        {/* Internal Pulse for Action */}
                        <div className="absolute inset-0 rounded-[1.2rem] animate-pulse bg-emerald-500/10 blur-md" />
                    </div>
                </div>
            </div>

            {/* Glossy Reflection (Premium Touch) */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        </div>
    );
}
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search, Ghost } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#F54D27] flex items-center justify-center p-6 overflow-hidden relative">

            {/* --- Background Decorative Elements --- */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/20 blur-[120px] rounded-full" />

            <div className="max-w-2xl w-full text-center relative z-10">

                {/* 1. Animated Error Code */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-[12rem] md:text-[18rem] font-black text-white/20 leading-none tracking-tighter select-none">
                        404
                    </h1>
                </motion.div>

                {/* 2. Floating Icon Section */}
                <motion.div
                    className="absolute top-1/4 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center rotate-12">
                        <Ghost size={60} className="text-[#F54D27] animate-pulse" />
                    </div>
                </motion.div>

                {/* 3. Text Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 space-y-4"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        Lost in Space?
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
                        The page you are looking for doesn't exist or has been moved to another dimension.
                    </p>
                </motion.div>

                {/* 4. Action Buttons */}
                <motion.div
                    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-black/80 hover:scale-105 active:scale-95 shadow-2xl"
                    >
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        Go Back
                    </button>

                    {/* Home Button */}
                    <Link
                        href="/"
                        className="group flex items-center gap-3 px-8 py-4 bg-white text-[#F54D27] rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 shadow-2xl"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                </motion.div>

                {/* 5. Support Link */}
                <motion.p
                    className="mt-12 text-white/40 text-[10px] font-black uppercase tracking-[0.3em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    System Status: <span className="text-white">Active</span> | Build: <span className="text-white text-xs italic">v1.3</span>
                </motion.p>
            </div>

            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        </div>
    );
}
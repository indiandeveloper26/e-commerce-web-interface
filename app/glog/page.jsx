"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Wallet, ShieldCheck, Activity } from 'lucide-react';

export default function page() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-[#05070a] overflow-hidden font-sans selection:bg-blue-500/30">

            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-[440px] px-6"
            >
                {/* Main Card */}
                <div className="relative group">
                    {/* Neon Border Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                    <div className="relative bg-[#0d1117]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">

                        {/* Header */}
                        <div className="text-center mb-10">
                            <motion.h1
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                className="text-4xl font-black italic tracking-tighter text-white"
                            >
                                VELOCITY<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">BET</span>
                            </motion.h1>
                            <p className="text-xs text-gray-500 mt-2 font-medium tracking-[0.2em] uppercase">Premier Sports Exchange</p>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div className="group/input relative">
                                <input
                                    type="text"
                                    placeholder="Account ID / Email"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-cyan-500/50 transition-all"
                                />
                            </div>

                            <div className="group/input relative">
                                <input
                                    type="password"
                                    placeholder="Secure Pin"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-cyan-500/50 transition-all"
                                />
                            </div>

                            <button className="w-full py-4 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-900/20 transform active:scale-95 transition-all uppercase tracking-widest">
                                Secure Entry
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0d1117] px-4 text-gray-500 tracking-widest font-bold">Quick Access</span></div>
                        </div>

                        {/* Quick Access Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group">
                                <Fingerprint className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Passkey</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group">
                                <Wallet className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Wallet</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status Indicators */}
                <div className="mt-8 flex items-center justify-between px-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500/80 uppercase">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        In-Play Ready
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase">
                        <ShieldCheck className="w-3 h-3" />
                        256-Bit Encrypted
                    </div>
                </div>
            </motion.div>

            {/* Footer Branding */}
            <footer className="absolute bottom-6 w-full text-center">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                    Play Responsibly. 21+ Only. <a href="#" className="text-blue-500/60 hover:text-blue-500 ml-1 underline transition-colors">Terms & Conditions</a>
                </p>
            </footer>
        </div>
    );
}
"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authslice";
import { toast } from "react-toastify";
import { useTheme } from "../Redux/contextapi";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    // --- YOUR LOGIC START ---
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json().catch(() => ({}));
            const userdata = data.user;

            if (data.login === "true") {
                localStorage.setItem("id", userdata._id);
                dispatch(login({ userdata }));
                toast.success("You are successfully logged in!");
                router.push("/products");
            } else {
                setMessage(data.error || "Invalid credentials");
                toast.error(data.error || "Login Failed");
            }
        } catch (err) {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    // --- YOUR LOGIC END ---

    return (
        <div className={`min-h-screen flex items-center justify-center font-sans transition-colors duration-500 ${isDark ? "bg-[#0a0a0b]" : "bg-[#f8f9fa]"}`}>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`w-full max-w-5xl mx-4 grid grid-cols-1 md:grid-cols-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-[2.5rem] overflow-hidden ${isDark ? "bg-[#121214] border border-white/5" : "bg-white"}`}
            >

                {/* LEFT SIDE: Brand Visual */}
                <div className={`relative hidden md:flex flex-col justify-between p-12 overflow-hidden ${isDark ? "bg-[#18181b]" : "bg-gradient-to-br from-[#F54D27] to-[#ff7e5f]"}`}>
                    <div className="relative z-10">
                        <h2 className="text-white text-3xl font-black italic tracking-tighter">CORE<span className="opacity-70">CART</span></h2>
                    </div>

                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Image
                                src="/img/login.jpg" // Using your image path
                                alt="Shop Login"
                                width={500}
                                height={500}
                                className="w-full max-w-sm mx-auto rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
                                priority
                            />
                        </motion.div>
                        <div className="mt-8 text-white/90">
                            <h3 className="text-2xl font-bold">New Season, New Rewards.</h3>
                            <p className="text-sm text-white/60 mt-2">Log in to claim your member-only discounts.</p>
                        </div>
                    </div>

                    {/* Decorative Background Blob */}
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                </div>

                {/* RIGHT SIDE: Interactive Form */}
                <div className="p-8 md:p-16 flex flex-col justify-center">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className={`text-4xl font-black tracking-tight mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Welcome Back</h1>
                        <p className={`text-sm font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>Please enter your credentials to proceed.</p>
                    </div>

                    {/* Error Message Animation */}
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2"
                            >
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Email Address</label>
                            <div className="relative group">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDark ? "text-gray-600 group-focus-within:text-[#F54D27]" : "text-gray-300 group-focus-within:text-[#F54D27]"}`} />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl outline-none transition-all font-bold text-sm border ${isDark
                                        ? "bg-white/5 border-white/5 text-white focus:border-[#F54D27]"
                                        : "bg-gray-50 border-gray-100 text-gray-900 focus:border-[#F54D27]"
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>Password</label>
                                <Link href="/forgot" className="text-[10px] font-black text-[#F54D27] hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDark ? "text-gray-600 group-focus-within:text-[#F54D27]" : "text-gray-300 group-focus-within:text-[#F54D27]"}`} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl outline-none transition-all font-bold text-sm border ${isDark
                                        ? "bg-white/5 border-white/5 text-white focus:border-[#F54D27]"
                                        : "bg-gray-50 border-gray-100 text-gray-900 focus:border-[#F54D27]"
                                        }`}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-5 rounded-2xl font-black text-white text-sm tracking-widest transition-all shadow-xl flex justify-center items-center gap-3 active:scale-[0.98] ${loading
                                ? "bg-gray-600 opacity-70 cursor-not-allowed"
                                : "bg-[#F54D27] hover:bg-[#e04322] shadow-[#F54D27]/20 group"
                                }`}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                <>
                                    ENTER STORE
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className={`text-sm font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-[#F54D27] hover:underline decoration-2 underline-offset-4">
                                Sign Up
                            </Link>
                        </p>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 flex items-center justify-center gap-6 opacity-40">
                        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            256-Bit SSL
                        </div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        <div className="text-[9px] font-black uppercase tracking-tighter">&copy; 2026 CoreCart</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTheme } from "../Redux/contextapi";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authslice";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Loader2, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
    // --- YOUR REAL LOGIC ---
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);

    const { theme } = useTheme();
    const isDark = theme === "dark";
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!agree) {
            setMessage("You must agree to the Terms & Conditions.");
            toast.warning("Please accept the terms.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" },
            });

            if (res.status === 409) {
                setMessage("Email already exists. Please login or use another email.");
                setLoading(false);
                return;
            }

            const data = await res.json().catch(() => ({}));

            if (data.userId) {
                localStorage.setItem("id", data.userId);
                dispatch(login({ data })); // Using your dispatch logic
                toast.success("Signup successful! Welcome to CoreCart.");
                router.push("/");
            } else {
                setMessage(data.message || "Error occurred during signup.");
            }
        } catch (err) {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center font-sans transition-colors duration-500 ${isDark ? "bg-[#0a0a0b]" : "bg-[#f8f9fa]"}`}>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-full max-w-5xl mx-4 grid grid-cols-1 md:grid-cols-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-[2.5rem] overflow-hidden ${isDark ? "bg-[#121214] border border-white/5" : "bg-white"}`}
            >

                {/* LEFT SIDE: Brand Visual (Matches Login) */}
                <div className={`relative hidden md:flex flex-col justify-between p-12 overflow-hidden ${isDark ? "bg-[#18181b]" : "bg-gradient-to-br from-[#F54D27] to-[#ff7e5f]"}`}>
                    <div className="relative z-10">
                        <h2 className="text-white text-3xl font-black italic tracking-tighter uppercase">CORE<span className="opacity-70 text-gray-900">CART</span></h2>
                    </div>

                    <div className="relative z-10">
                        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                            <Image
                                src="/img/login.jpg" // Using your image path
                                alt="Shop Signup"
                                width={500}
                                height={500}
                                className="w-full max-w-sm mx-auto rounded-3xl shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500"
                                priority
                            />
                        </motion.div>
                        <div className="mt-8 text-white/90">
                            <h3 className="text-2xl font-bold">Start Your Journey.</h3>
                            <p className="text-sm text-white/60 mt-2">Create an account to track orders and earn points.</p>
                        </div>
                    </div>

                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                </div>

                {/* RIGHT SIDE: Signup Form */}
                <div className="p-8 md:p-16 flex flex-col justify-center">
                    <div className="mb-8 text-center md:text-left">
                        <h1 className={`text-4xl font-black tracking-tight mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Join Us</h1>
                        <p className={`text-sm font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>Create your shopping account today.</p>
                    </div>

                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2"
                            >
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Full Name</label>
                            <div className="relative group">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDark ? "text-gray-600 group-focus-within:text-[#F54D27]" : "text-gray-300 group-focus-within:text-[#F54D27]"}`} />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl outline-none transition-all font-bold text-sm border ${isDark ? "bg-white/5 border-white/5 text-white focus:border-[#F54D27]" : "bg-gray-50 border-gray-100 focus:border-[#F54D27]"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Email Address</label>
                            <div className="relative group">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDark ? "text-gray-600 group-focus-within:text-[#F54D27]" : "text-gray-300 group-focus-within:text-[#F54D27]"}`} />
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl outline-none transition-all font-bold text-sm border ${isDark ? "bg-white/5 border-white/5 text-white focus:border-[#F54D27]" : "bg-gray-50 border-gray-100 focus:border-[#F54D27]"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Password</label>
                            <div className="relative group">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDark ? "text-gray-600 group-focus-within:text-[#F54D27]" : "text-gray-300 group-focus-within:text-[#F54D27]"}`} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    className={`w-full pl-12 pr-12 py-3.5 rounded-2xl outline-none transition-all font-bold text-sm border ${isDark ? "bg-white/5 border-white/5 text-white focus:border-[#F54D27]" : "bg-gray-50 border-gray-100 focus:border-[#F54D27]"
                                        }`}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-center gap-2 py-2">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={() => setAgree(!agree)}
                                className="w-4 h-4 rounded border-gray-300 text-[#F54D27] focus:ring-[#F54D27]"
                            />
                            <p className={`text-xs font-bold ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                                I accept the <Link href="/terms" className="text-[#F54D27] underline">Terms & Conditions</Link>
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl font-black text-white text-sm tracking-widest transition-all shadow-xl flex justify-center items-center gap-3 active:scale-[0.98] ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-[#F54D27] hover:bg-[#e04322] shadow-[#F54D27]/20 group"
                                }`}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                <>
                                    CREATE ACCOUNT
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className={`text-sm font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                            Already a member? <Link href="/login" className="text-[#F54D27] hover:underline decoration-2 underline-offset-4">Sign In</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
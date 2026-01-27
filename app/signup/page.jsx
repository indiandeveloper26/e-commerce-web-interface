"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTheme } from "../Redux/contextapi";

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!agree) {
            setMessage("You must agree to the Terms & Conditions.");
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
                return;
            }

            const data = await res.json().catch(() => ({}));

            if (data.signup === "true") {
                toast.success("Signup successful! Redirecting...");
                router.push("/products");
            } else {
                setMessage(data.message || "Error occurred");
            }
        } catch (err) {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 py-10 ${isDark ? "bg-gray-900" : "bg-gray-100"
                }`}
        >
            <div
                className={`rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-2 ${isDark ? "bg-gray-800" : "bg-white"
                    }`}
            >
                {/* LEFT IMAGE */}
                <div
                    className={`hidden md:flex items-center justify-center p-6 ${isDark ? "bg-gray-700" : "bg-gradient-to-br from-[#F54D27] to-[#ff7e5f]"
                        }`}
                >
                    <Image
                        src="/img/login.jpg"
                        alt="Signup Illustration"
                        width={400}
                        height={400}
                        className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                        priority
                    />
                </div>

                {/* RIGHT FORM */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <h1
                        className={`text-3xl font-bold text-center mb-6 ${isDark ? "text-gray-100" : "text-gray-900"
                            }`}
                    >
                        Create Account
                    </h1>

                    {message && (
                        <p className="text-center mb-4 text-sm text-red-500">{message}</p>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F54D27] transition placeholder-gray-400 ${isDark
                                ? "border-gray-600 bg-gray-700 text-gray-100"
                                : "border-gray-300 bg-white text-gray-900"
                                }`}
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />

                        <input
                            type="email"
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F54D27] transition placeholder-gray-400 ${isDark
                                ? "border-gray-600 bg-gray-700 text-gray-100"
                                : "border-gray-300 bg-white text-gray-900"
                                }`}
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F54D27] transition placeholder-gray-400 ${isDark
                                    ? "border-gray-600 bg-gray-700 text-gray-100"
                                    : "border-gray-300 bg-white text-gray-900"
                                    }`}
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={() => setAgree(!agree)}
                                className="h-4 w-4 text-[#F54D27] focus:ring-[#F54D27] border-gray-300 rounded"
                            />
                            <label
                                className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"
                                    }`}
                            >
                                I agree to the{" "}
                                <Link href="/terms" className="text-[#F54D27] hover:underline">
                                    Terms & Conditions
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 mt-2 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${loading
                                ? "opacity-50 cursor-not-allowed bg-[#F54D27]"
                                : "bg-[#F54D27] hover:bg-[#e04322]"
                                }`}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    <p
                        className={`text-center text-sm mt-4 ${isDark ? "text-gray-300" : "text-gray-500"
                            }`}
                    >
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-[#F54D27] font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                    <p
                        className={`text-center text-xs mt-6 ${isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        &copy; 2026 YourShop. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

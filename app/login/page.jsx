"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authslice";
import { toast } from "react-toastify";
import { useTheme } from "../Redux/contextapi";

export default function LoginPage() {
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
                dispatch(login({ userdata }));
                toast.success("You are successfully logged in!");
                router.push("/products");
            } else {
                setMessage(data.error || "Invalid credentials");
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
                        alt="Login Illustration"
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
                        Welcome Back
                    </h1>

                    {message && (
                        <p className="text-center mb-4 text-sm text-red-500">{message}</p>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F54D27] transition ${isDark
                                ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400"
                                : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                                }`}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            required
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F54D27] transition ${isDark
                                ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400"
                                : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                                }`}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 mt-2 text-white font-semibold rounded-lg transition-all duration-300 shadow-md ${loading
                                ? "opacity-50 cursor-not-allowed bg-[#F54D27]"
                                : "bg-[#F54D27] hover:bg-[#e04322]"
                                }`}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p
                        className={`text-center text-sm mt-4 ${isDark ? "text-gray-300" : "text-gray-500"
                            }`}
                    >
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-[#F54D27] font-semibold hover:underline"
                        >
                            Sign Ups
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

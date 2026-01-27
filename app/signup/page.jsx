"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "../Redux/contextapi"; // adjust the path

export default function SignupPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

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

            console.log('daafd', red)

            const data = await res.json().catch(() => ({}));

            if (data.signup === "true") {
                toast.success("Signup successful! Redirecting...");
                router.push("/products");
            } else {
                setMessage(data.message || "Error occurred");
            }
        } catch (err) {
            setMessage("Something went wrong. Please try again.");
        }
    };


    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4 ${isDark ? "bg-gray-900" : "bg-gray-100"
                }`}
        >
            <div
                className={`rounded-xl shadow-lg w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-2 ${isDark ? "bg-gray-800" : "bg-white"
                    }`}
            >
                {/* LEFT IMAGE */}
                <div
                    className={`flex items-center justify-center p-6 ${isDark ? "bg-gray-700" : "bg-blue-50"
                        }`}
                >
                    <Image
                        src="/img/images.jpg"
                        alt="Signup Illustration"
                        width={400}
                        height={400}
                        className="w-full max-w-sm mx-auto"
                        priority
                    />
                </div>

                {/* RIGHT FORM */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <h1
                        className={`text-2xl font-bold text-center mb-6 ${isDark ? "text-gray-100" : "text-gray-800"
                            }`}
                    >
                        Create Account
                    </h1>

                    {message && (
                        <p className="text-center mb-4 text-sm text-red-500">{message}</p>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 ${isDark
                                ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-400"
                                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                                }`}
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />

                        <input
                            type="email"
                            className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 ${isDark
                                ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-400"
                                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                                }`}
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />

                        <input
                            type="password"
                            className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 ${isDark
                                ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-400"
                                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                                }`}
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-300"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p
                        className={`text-center text-sm mt-4 ${isDark ? "text-gray-300" : "text-gray-500"
                            }`}
                    >
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

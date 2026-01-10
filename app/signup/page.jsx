"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function SignupPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json().catch(() => ({}));

        console.log("datat", data);
        setMessage(data.message || "Error occurred");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* LEFT IMAGE (Desktop & Mobile) */}
                <div className="flex items-center justify-center bg-blue-50 p-6">
                    <Image
                        src="/img/images.jpg"   // <-- Ensure this exists in public/images/
                        alt="Signup Illustration"
                        width={400}
                        height={400}
                        className="w-full max-w-sm mx-auto"
                        priority
                    />
                </div>

                {/* RIGHT FORM */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Create Account
                    </h1>

                    {message && (
                        <p className="text-center mb-4 text-sm text-red-500">{message}</p>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />

                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />

                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

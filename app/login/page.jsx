"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, updateUser } from "../Redux/authslice";
export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);







    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    console.log('data', isLoggedIn, user)

    const router = useRouter();

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

            console.log('data', data)

            if (data.login === "true") {
                dispatch(login({ email: 'sahilindia@gmail.com', name: 'sahilinida' }));
                router.push("/about");
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* LEFT IMAGE (Desktop & Mobile) */}
                <div className="flex items-center justify-center bg-blue-50 p-6">
                    <Image
                        src="/img/images.jpg"   // <-- Ensure this exists in public/img/
                        alt="Login Illustration"
                        width={400}
                        height={400}
                        className="w-full max-w-sm mx-auto"
                        priority
                    />
                </div>

                {/* RIGHT FORM */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Login
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
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

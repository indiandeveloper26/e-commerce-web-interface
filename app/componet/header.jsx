"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authslice";
import { useTheme } from "../Redux/contextapi";
import { FaCartPlus } from "react-icons/fa";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { theme, toggleTheme } = useTheme();

    const handleLogout = async () => {
        await fetch("/api/auth/logout");
        dispatch(logout());
        router.push("/login");
        setIsOpen(false);
    };

    return (
        <header className="bg-blue-600 dark:bg-gray-900 text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold hover:text-gray-200 dark:hover:text-gray-300">
                    MyApp
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link className="hover:text-gray-200 dark:hover:text-gray-300" href="/">Home</Link>
                    <Link className="hover:text-gray-200 dark:hover:text-gray-300" href="/about">About</Link>
                    <Link className="hover:text-gray-200 dark:hover:text-gray-300" href="/products">Products</Link>
                    <Link className="hover:text-gray-200 dark:hover:text-gray-300" href="/itemlist">Product List</Link>

                    {!isLoggedIn ? (
                        <>
                            <Link className="hover:text-gray-200 dark:hover:text-gray-300" href="/login">Login</Link>
                            <Link className="hover:text-gray-200 dark:hover:text-gray-300" href="/signup">Signup</Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    )}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="ml-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

                    {/* Cart Icon */}
                    <button
                        onClick={() => router.push("/cart")}
                        className="ml-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20"
                    >
                        <FaCartPlus />
                    </button>
                </nav>

                {/* Mobile Buttons */}
                {/* Mobile Buttons */}
                <div className="md:hidden flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 dark:bg-white/10"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

                    {/* Cart Icon */}
                    <button
                        onClick={() => router.push("/cart")}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 dark:bg-white/10"
                    >
                        <FaCartPlus />
                    </button>

                    {/* Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-2xl"
                    >
                        ☰
                    </button>
                </div>

            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-blue-500 dark:bg-gray-800 text-white w-full absolute top-16 left-0 z-40 shadow-lg transition-transform duration-300 ease-in-out
          ${isOpen ? "max-h-[calc(100vh-4rem)] overflow-y-auto" : "max-h-0 overflow-hidden"}
        `}
            >
                <Link href="/" className="block px-4 py-3 hover:bg-blue-400 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Home</Link>
                <Link href="/about" className="block px-4 py-3 hover:bg-blue-400 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>About</Link>
                <Link href="/products" className="block px-4 py-3 hover:bg-blue-400 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Products</Link>
                <Link href="/itemlist" className="block px-4 py-3 hover:bg-blue-400 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Product List</Link>

                {!isLoggedIn ? (
                    <>
                        <Link href="/login" className="block px-4 py-3 hover:bg-blue-400 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Login</Link>
                        <Link href="/signup" className="block px-4 py-3 hover:bg-blue-400 dark:hover:bg-gray-700" onClick={() => setIsOpen(false)}>Signup</Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}

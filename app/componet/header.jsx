"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCartPlus, FaBoxOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../Redux/contextapi";
import Link from "next/link";
import { logout } from "../Redux/authslice";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { theme, toggleTheme } = useTheme();

    const handleLogout = async () => {
        await fetch("/api/auth/logout");
        dispatch(logout());
        router.push("/products");
        setIsOpen(false);
    };

    return (
        <header
            className="
            bg-[#F54D27]
            text-white
            shadow-lg
            border-b-4 border-[#e04322]
            sticky top-0 z-50
            "
        >
            <div className="container mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-wide hover:opacity-90"
                >
                    MyApp
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link className="hover:opacity-80" href="/">Home</Link>
                    <Link className="hover:opacity-80" href="/orders">Orders</Link>
                    <Link className="hover:opacity-80" href="/products">Products</Link>
                    <Link className="hover:opacity-80" href="/itemlist">Product List</Link>

                    {!isLoggedIn ? (
                        <>
                            <Link className="hover:opacity-80" href="/login">Login</Link>
                            <Link className="hover:opacity-80" href="/signup">Signup</Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="
                            bg-white text-[#F54D27]
                            border-2 border-white
                            px-3 py-1 rounded-lg
                            font-medium
                            hover:bg-transparent hover:text-white
                            transition
                            "
                        >
                            Logout
                        </button>
                    )}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="
                        ml-3 w-9 h-9
                        flex items-center justify-center
                        rounded-full
                        border-2 border-white
                        hover:bg-white/20
                        transition
                        "
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

                    {/* Orders Icon */}
                    {isLoggedIn && (
                        <button
                            onClick={() => router.push("/orders")}
                            className="
                            ml-3 w-9 h-9
                            flex items-center justify-center
                            rounded-full
                            border-2 border-white
                            hover:bg-white/20
                            transition
                            "
                        >
                            <FaBoxOpen />
                        </button>
                    )}

                    {/* Cart Icon */}
                    <button
                        onClick={() => router.push("/cart")}
                        className="
                        ml-3 w-9 h-9
                        flex items-center justify-center
                        rounded-full
                        border-2 border-white
                        hover:bg-white/20
                        transition
                        "
                    >
                        <FaCartPlus />
                    </button>
                </nav>

                {/* Mobile Buttons */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-white"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

                    {isLoggedIn && (
                        <button
                            onClick={() => router.push("/orders")}
                            className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-white"
                        >
                            <FaBoxOpen />
                        </button>
                    )}

                    <button
                        onClick={() => router.push("/cart")}
                        className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-white"
                    >
                        <FaCartPlus />
                    </button>

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
                className={`
                md:hidden
                bg-[#F54D27]
                border-t-4 border-[#e04322]
                text-white
                w-full absolute top-16 left-0 z-40
                shadow-lg
                transition-all duration-300
                ${isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}
                `}
            >
                <Link href="/" className="block px-4 py-3 hover:bg-[#e04322]" onClick={() => setIsOpen(false)}>Home</Link>
                <Link href="/products" className="block px-4 py-3 hover:bg-[#e04322]" onClick={() => setIsOpen(false)}>Products</Link>
                <Link href="/itemlist" className="block px-4 py-3 hover:bg-[#e04322]" onClick={() => setIsOpen(false)}>Product List</Link>

                {!isLoggedIn ? (
                    <>
                        <Link href="/login" className="block px-4 py-3 hover:bg-[#e04322]" onClick={() => setIsOpen(false)}>Login</Link>
                        <Link href="/signup" className="block px-4 py-3 hover:bg-[#e04322]" onClick={() => setIsOpen(false)}>Signup</Link>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-3 bg-white text-[#F54D27] font-semibold"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => { router.push("/orders"); setIsOpen(false); }}
                            className="block w-full text-left px-4 py-3 bg-[#e04322]"
                        >
                            Orders
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

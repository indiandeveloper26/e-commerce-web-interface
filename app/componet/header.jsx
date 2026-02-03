"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Box, Sun, Moon, LogOut, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../Redux/contextapi";
import { logout } from "../Redux/authslice";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Collection", href: "/itemlist" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout");
        dispatch(logout());
        router.push("/products");
        setIsOpen(false);
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? "py-3 bg-[#F54D27] shadow-lg" // SCROLLED: still ORANGE
                : "py-5 bg-[#F54D27]" // NORMAL: ORANGE
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black italic text-xl bg-white text-[#F54D27] -rotate-3 group-hover:rotate-0">
                        M
                    </div>
                    <span className="text-2xl font-black italic tracking-tighter uppercase text-white">
                        Velora Commerce<span className="text-white">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-[11px] font-black uppercase tracking-[0.2em] text-white opacity-80 hover:opacity-100 ${pathname === link.href ? "opacity-100" : ""
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/20 text-white"
                    >
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    <div className="hidden md:flex items-center gap-3">
                        {isLoggedIn ? (
                            <>
                                <button onClick={() => router.push("/orders")} className="nav-icon-btn text-white">
                                    <Box size={18} />
                                </button>
                                <button onClick={() => router.push("/cart")} className="nav-icon-btn relative text-white">
                                    <ShoppingBag size={18} />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-[#F54D27] text-[8px] font-black rounded-full flex items-center justify-center">
                                        2
                                    </span>
                                </button>
                                <button onClick={handleLogout} className="ml-2 p-2 text-white hover:text-gray-200 transition-colors">
                                    <LogOut size={18} />
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-white/20 text-white hover:bg-white/30 transition-all"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-white">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-[#F54D27] z-50 p-6 flex flex-col overflow-y-auto text-white"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-black italic text-2xl uppercase tracking-tighter text-white">
                                Menu<span className="text-white">.</span>
                            </span>
                            <button onClick={() => setIsOpen(false)} className="p-2 bg-white/20 rounded-xl">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-bold uppercase hover:text-white/80 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {isLoggedIn && (
                                <>
                                    <Link href="/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-xl font-bold opacity-80">
                                        <Box /> My Orders
                                    </Link>
                                    <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-xl font-bold opacity-80">
                                        <ShoppingBag /> Cart
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="mt-auto">
                            {!isLoggedIn ? (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full py-4 bg-white/20 text-white text-center rounded-2xl font-black uppercase"
                                >
                                    Login
                                </Link>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-4 bg-white/20 text-white rounded-2xl font-black uppercase"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

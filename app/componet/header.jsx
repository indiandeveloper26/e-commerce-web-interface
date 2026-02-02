"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingBag, Box, Sun, Moon, LogOut, Menu, X, User, LayoutGrid } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../Redux/contextapi";
import Link from "next/link";
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

    // Handle scroll effect for a modern sticky feel
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

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Collection", href: "/itemlist" },
    ];

    return (
        <header className={`sticky top-0 z-[100] transition-all duration-300 ${scrolled
            ? "py-3 bg-white/80 dark:bg-[#0f1115]/80 backdrop-blur-xl shadow-2xl border-b border-gray-200 dark:border-gray-800"
            : "py-5 bg-[#F54D27] text-white"
            }`}>
            <div className="container mx-auto px-6 flex justify-between items-center">

                {/* Logo Section */}
                <Link href="/" className="group flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black italic text-xl transition-all ${scrolled ? "bg-[#F54D27] text-white rotate-3" : "bg-white text-[#F54D27] -rotate-3 group-hover:rotate-0"
                        }`}>M</div>
                    <span className={`text-2xl font-black italic tracking-tighter uppercase ${scrolled ? "text-gray-900 dark:text-white" : "text-white"}`}>
                        MyApp<span className={scrolled ? "text-[#F54D27]" : "text-gray-900"}>.</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:opacity-100 ${pathname === link.href ? "opacity-100 text-[#F54D27]" : "opacity-50"
                                } ${!scrolled && "text-white opacity-80 hover:opacity-100"}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Action Icons */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${scrolled ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300" : "bg-white/20 text-white"
                            }`}
                    >
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {/* Desktop Only Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {isLoggedIn ? (
                            <>
                                <button onClick={() => router.push("/orders")} className={`nav-icon-btn ${scrolled ? "bg-gray-100 dark:bg-gray-800" : "bg-white/20"}`}>
                                    <Box size={18} />
                                </button>
                                <button onClick={() => router.push("/cart")} className={`nav-icon-btn relative ${scrolled ? "bg-gray-100 dark:bg-gray-800" : "bg-white/20"}`}>
                                    <ShoppingBag size={18} />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white text-[8px] font-black rounded-full flex items-center justify-center">2</span>
                                </button>
                                <button onClick={handleLogout} className="ml-2 p-2 hover:text-red-500 transition-colors">
                                    <LogOut size={18} />
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className={`px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${scrolled ? "bg-gray-900 text-white hover:bg-[#F54D27]" : "bg-white text-[#F54D27] hover:bg-gray-100"
                                }`}>
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden w-10 h-10 rounded-2xl flex items-center justify-center ${scrolled ? "text-gray-900 dark:text-white" : "text-white"}`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-[#0f1115] shadow-2xl z-[110] p-10 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <span className="font-black italic text-2xl uppercase tracking-tighter">Menu<span className="text-[#F54D27]">.</span></span>
                            <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl"><X size={20} /></button>
                        </div>

                        <div className="flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-4xl font-black italic tracking-tighter uppercase hover:text-[#F54D27] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-gray-100 dark:border-gray-800" />
                            <Link href="/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-xl font-bold uppercase tracking-widest opacity-50"><Box /> My Orders</Link>
                            <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-xl font-bold uppercase tracking-widest opacity-50"><ShoppingBag /> Cart</Link>
                        </div>

                        <div className="mt-auto">
                            {!isLoggedIn ? (
                                <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full py-5 bg-[#F54D27] text-white text-center rounded-[2rem] font-black uppercase tracking-widest">Login</Link>
                            ) : (
                                <button onClick={handleLogout} className="w-full py-5 bg-gray-100 dark:bg-gray-800 rounded-[2rem] font-black uppercase tracking-widest">Logout</button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Box, Sun, Moon, LogOut, Menu, X, User, ChevronDown, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../Redux/contextapi";
import { logout } from "../Redux/authslice";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false); // Dropdown state
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);

    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const { theme, toggleTheme } = useTheme();

    const userData = user?.userdata || user;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Collection", href: "/itemlist" },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout");
        dispatch(logout());
        setProfileOpen(false);
        router.push("/login");
    };

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "py-3 bg-[#F54D27] shadow-xl" : "py-5 bg-[#F54D27]"}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black italic text-xl bg-white text-[#F54D27] -rotate-3 group-hover:rotate-0 transition-transform">
                        V
                    </div>
                    <span className="text-2xl font-black italic tracking-tighter uppercase text-white hidden sm:block">
                        Velora<span className="opacity-70">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className={`text-[11px] font-black uppercase tracking-[0.2em] text-white transition-opacity ${pathname === link.href ? "opacity-100" : "opacity-60 hover:opacity-100"}`}>
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button onClick={toggleTheme} className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all">
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    <div className="hidden md:flex items-center gap-3">
                        {isLoggedIn ? (
                            <>
                                {/* Cart Icon */}
                                <button onClick={() => router.push("/cart")} className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/10 text-white hover:bg-white/20 relative">
                                    <ShoppingBag size={18} />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-[#F54D27] text-[8px] font-black rounded-full flex items-center justify-center">
                                        {userData?.cart?.length || 0}
                                    </span>
                                </button>

                                {/* --- USER PROFILE DROPDOWN --- */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setProfileOpen(!profileOpen)}
                                        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-2xl bg-white text-[#F54D27] hover:bg-gray-100 transition-all shadow-lg active:scale-95"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-[#F54D27] text-white flex items-center justify-center font-bold text-xs">
                                            {userData?.name ? userData.name[0].toUpperCase() : <User size={14} />}
                                        </div>
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    <AnimatePresence>
                                        {profileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 mt-3 w-56 rounded-[2rem] bg-white shadow-2xl p-2 z-[60] overflow-hidden border border-gray-100"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Signed in as</p>
                                                    <p className="text-sm font-bold text-gray-900 truncate">{userData?.name}</p>
                                                </div>

                                                <DropdownItem icon={<User size={16} />} label="My Profile" onClick={() => { router.push('/profile'); setProfileOpen(false); }} />
                                                <DropdownItem icon={<Box size={16} />} label="Orders" onClick={() => { router.push('/orders'); setProfileOpen(false); }} />
                                                <DropdownItem icon={<Settings size={16} />} label="Settings" onClick={() => setProfileOpen(false)} />

                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 font-black text-[11px] uppercase tracking-widest transition-all mt-1"
                                                >
                                                    <LogOut size={16} /> Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <Link href="/login" className="px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-white text-[#F54D27] hover:bg-gray-100 transition-all shadow-lg">
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-2xl">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Overlay Code (Same as before, but with added Profile Link) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-[#F54D27] z-50 p-6 flex flex-col text-white"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-black italic text-2xl uppercase tracking-tighter">Menu</span>
                            <button onClick={() => setIsOpen(false)} className="p-2 bg-white/20 rounded-xl"><X size={20} /></button>
                        </div>
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase">{link.name}</Link>
                            ))}
                            {isLoggedIn && (
                                <>
                                    <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-xl font-bold opacity-80"><User /> My Profile</Link>
                                    <Link href="/order" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-xl font-bold opacity-80"><Box /> My Orders</Link>
                                    <button onClick={handleLogout} className="flex items-center gap-4 text-xl font-bold text-white/60 mt-4"><LogOut /> Logout</button>
                                </>
                            )}
                        </div>
                        {!isLoggedIn && (
                            <Link href="/login" onClick={() => setIsOpen(false)} className="mt-auto block w-full py-4 bg-white text-[#F54D27] text-center rounded-2xl font-black uppercase tracking-widest">Sign In</Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

// Dropdown Item Helper
function DropdownItem({ icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 font-bold text-[11px] uppercase tracking-widest transition-all"
        >
            <span className="text-[#F54D27] opacity-70">{icon}</span>
            {label}
        </button>
    );
}
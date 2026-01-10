"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authslice";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    console.log('logindata', isLoggedIn, user)

    // Logout function





    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "GET" });
            if (res.ok) {
                router.push("/login"); // redirect after logout
            } else {
                console.error("Logout failed");
            }

            dispatch(logout())
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo / Brand */}
                <Link href="/" className="text-xl font-bold">
                    MyApp
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6 items-center">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    <Link href="/about" className="hover:underline">
                        About
                    </Link>
                    <Link href="/login" className="hover:underline">
                        Login
                    </Link>
                    <Link href="/signup" className="hover:underline">
                        Signup
                    </Link>
                    {/* Logout Button */}
                    {
                        isLoggedIn ? <button
                            onClick={handleLogout}
                            className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                        >
                            Logout
                        </button> : <button
                            onClick={handleLogout}
                            className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                        >
                            login
                        </button>
                    }
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-500">
                    <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-blue-400"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="block px-4 py-2 hover:bg-blue-400"
                        onClick={() => setIsOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-blue-400"
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="block px-4 py-2 hover:bg-blue-400"
                        onClick={() => setIsOpen(false)}
                    >
                        Signup
                    </Link>
                    {/* Logout Button Mobile */}
                    {
                        isLoggedIn ? <button
                            onClick={() => {
                                handleLogout();
                                setIsOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-red-600 bg-red-500"
                        >
                            Logout
                        </button> : <button
                            onClick={() => {
                                router.push('login')

                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-red-600 bg-red-500"
                        >
                            login
                        </button>
                    }
                </div>
            )}
        </header>
    );
}

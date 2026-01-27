"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#F54D27] text-white mt-16 border-t-4 border-[#e04322]">
            <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">MyApp</h2>
                    <p className="text-sm text-white/90 leading-relaxed">
                        Your one-stop shop for quality products.
                        Fast delivery, best prices, and trusted service.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/products" className="hover:underline">Products</Link></li>
                        <li><Link href="/orders" className="hover:underline">Orders</Link></li>
                        <li><Link href="/cart" className="hover:underline">Cart</Link></li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:underline">About Us</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                        <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Social + Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>

                    <div className="flex gap-3 mb-4">
                        <a href="#" className="p-2 border-2 border-white rounded-full hover:bg-white hover:text-[#F54D27] transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="p-2 border-2 border-white rounded-full hover:bg-white hover:text-[#F54D27] transition">
                            <FaInstagram />
                        </a>
                        <a href="#" className="p-2 border-2 border-white rounded-full hover:bg-white hover:text-[#F54D27] transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="p-2 border-2 border-white rounded-full hover:bg-white hover:text-[#F54D27] transition">
                            <FaWhatsapp />
                        </a>
                    </div>

                    <p className="text-sm text-white/90">
                        📞 +91 98765 43210 <br />
                        ✉ support@myapp.com
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#e04322] text-center py-4 text-sm border-t border-white/30">
                © {new Date().getFullYear()} MyApp. All rights reserved.
            </div>
        </footer>
    );
}

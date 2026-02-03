"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, MessageSquare, Mail, Phone, MapPin, Send } from "lucide-react";
import { useTheme } from "../Redux/contextapi";

export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <footer className={`mt-24 relative overflow-hidden ${isDark ? "bg-[#0f1115] text-white" : "bg-gray-50 text-gray-900"}`}>

            {/* Top Wave/Curve Divider */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-[#F54D27]`} />

            <div className="container mx-auto px-6 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand & GST Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-12 h-12 bg-[#F54D27] text-white rounded-2xl flex items-center justify-center font-black italic text-2xl rotate-3 group-hover:rotate-0 transition-transform">
                                S
                            </div>
                            <span className="text-3xl font-black italic tracking-tighter uppercase">
                                Soyab Akhtar<span className="text-[#F54D27]">.</span>
                            </span>
                        </Link>
                        <div className="text-sm font-medium opacity-60 leading-relaxed max-w-sm uppercase tracking-wider text-[11px] space-y-2">
                            <p>GSTIN: 06ESSPA3443R1Z4</p>
                            <p>Address: Kanwarsika Bus Stop, Nuh Road, Roz Ka Meo Industrial Area, Nuh, Haryana - 122103</p>
                        </div>

                        {/* Social Cloud */}
                        {/* <div className="flex gap-3">
                            {[
                                { Icon: Facebook, href: "#" },
                                { Icon: Instagram, href: "#" },
                                { Icon: Twitter, href: "#" },
                                { Icon: MessageSquare, href: "#" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1 ${isDark ? "bg-gray-800 text-white hover:bg-[#F54D27]" : "bg-white shadow-sm text-gray-400 hover:bg-[#F54D27] hover:text-white"}`}
                                >
                                    <social.Icon size={18} />
                                </a>
                            ))}
                        </div> */}
                    </div>

                    {/* Quick Navigation */}
                    <div className="lg:col-span-2">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F54D27] mb-8">Navigation</h3>
                        <ul className="space-y-4">
                            {["Home", "Products", "Orders", "Cart"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                                        className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-[#F54D27] transition-all"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal - PayU Verification Pages */}
                    <div className="lg:col-span-2">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F54D27] mb-8">Legal & Policy</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Privacy Policy", path: "/privacy-policy" },
                                { name: "Terms of Service", path: "/terms" },
                                { name: "Refund Policy", path: "/refund-policy" },
                                { name: "Shipping Policy", path: "/shipping-policy" },
                                { name: "Contact Us", path: "/contact" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-[#F54D27] transition-all"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Card */}
                    {/* <div className="lg:col-span-4">
                        <div className={`p-8 rounded-[2.5rem] ${isDark ? "bg-gray-800/50" : "bg-white shadow-xl border border-gray-100"}`}>
                            <h3 className="text-sm font-black italic uppercase tracking-tighter mb-6">Official Support</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                                    <Phone size={14} className="text-[#F54D27]" />
                                    <span className="text-[10px] font-black tracking-widest uppercase">+91 [Your Number]</span>
                                </div>
                                <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                                    <Mail size={14} className="text-[#F54D27]" />
                                    <span className="text-[10px] font-black tracking-widest uppercase">[Your Email]</span>
                                </div>
                                <div className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity">
                                    <MapPin size={14} className="text-[#F54D27] shrink-0" />
                                    <span className="text-[10px] font-black tracking-widest uppercase">Nuh, Haryana, 122103</span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Bottom Bar */}
                <div className={`mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 text-center md:text-left">
                        © {new Date().getFullYear()} Soyab Akhtar. All Rights Reserved.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20 hover:opacity-100 cursor-pointer transition-opacity">Visa</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20 hover:opacity-100 cursor-pointer transition-opacity">Mastercard</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20 hover:opacity-100 cursor-pointer transition-opacity">UPI / PayU</span>
                    </div>
                </div>
            </div>
        </footer >
    );
}
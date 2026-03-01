// "use client";

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { logout, updateUser } from "../Redux/authslice";
// import { useRouter } from "next/navigation";
// import { useTheme } from "../Redux/contextapi";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     User, Mail, Shield, LogOut, ShoppingCart, Package,
//     Calendar, AlertCircle, Loader2, IndianRupee,
//     ChevronRight, Wallet, Star, Clock
// } from "lucide-react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function ProfilePage() {
//     const { user, isLoggedIn } = useSelector((state) => state.auth);
//     const { theme } = useTheme();
//     const isDark = theme === "dark";
//     const dispatch = useDispatch();
//     const router = useRouter();

//     const [activeTab, setActiveTab] = useState("overview");
//     const [fullUser, setFullUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     console.log('loginid', user?.userdata?._id)

//     const userid = user?.userdata?._id || user?.data?.userId;

//     console.log('userid final ok na', userid)

//     useEffect(() => {
//         const fetchData = async () => {
//             if (!userid) return;
//             try {
//                 setLoading(true);
//                 const res = await axios.get(`/api/profile/${userid}`)

//                 console.log('resdata', res.data.user)
//                 if (res.data.success) {
//                     setFullUser(res.data.user);
//                     dispatch(updateUser(res.data.user));
//                 }
//             } catch (err) {
//                 toast.error("Data sync failed. Using local cache.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [userid, dispatch]);

//     const displayUser = fullUser || 'hii';

//     // --- LOGIC FOR COUNTS ---
//     const cartCount = displayUser?.cart?.length || 0;
//     const orderCount = displayUser?.orders?.length || 0;
//     const memberSince = new Date(displayUser?.createdAt || Date.now()).toLocaleDateString('en-IN', {
//         year: 'numeric', month: 'long'
//     });

//     if (!isLoggedIn) {
//         return (
//             <div className="h-screen flex items-center justify-center font-sans bg-[#0a0a0b] text-white">
//                 <div className="text-center p-10 border border-white/10 rounded-[3rem] bg-white/5 backdrop-blur-xl">
//                     <AlertCircle className="mx-auto mb-4 text-[#F54D27]" size={48} />
//                     <h2 className="text-2xl font-black uppercase italic tracking-tighter">Access Denied</h2>
//                     <p className="opacity-50 text-sm mb-6">Please login to view your CoreCart profile.</p>
//                     <button onClick={() => router.push('/login')} className="px-10 py-4 bg-[#F54D27] rounded-2xl font-black text-xs tracking-widest hover:scale-105 transition-all">GO TO LOGIN</button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className={`min-h-screen py-10 px-4 font-sans transition-colors duration-500 ${isDark ? "bg-[#0a0a0b] text-white" : "bg-[#f8f9fa] text-gray-900"}`}>

//             <div className="max-w-6xl mx-auto">
//                 {/* TOP HERO SECTION */}
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
//                     className={`relative p-8 md:p-12 rounded-[3.5rem] overflow-hidden mb-8 shadow-2xl ${isDark ? "bg-[#121214] border border-white/5" : "bg-white border border-gray-100"}`}
//                 >
//                     <div className="absolute top-0 right-0 w-64 h-64 bg-[#F54D27]/10 blur-[100px] rounded-full -mr-20 -mt-20" />

//                     <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
//                         {/* Avatar */}
//                         <div className="relative group">
//                             <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-[#F54D27] to-[#ff7e5f] rotate-6 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center shadow-2xl shadow-[#F54D27]/30">
//                                 <span className="text-5xl font-black text-white -rotate-6 group-hover:rotate-0 transition-transform">
//                                     {displayUser?.name?.[0].toUpperCase()}
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Name & Quick Info */}
//                         <div className="flex-1 text-center md:text-left">
//                             <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
//                                 <h1 className="text-4xl font-black tracking-tighter uppercase">{displayUser?.name}</h1>
//                                 <div className="p-1.5 bg-green-500/10 rounded-full"><Shield size={14} className="text-green-500" /></div>
//                             </div>
//                             <p className="text-sm font-bold opacity-40 flex items-center justify-center md:justify-start gap-2 uppercase tracking-widest">
//                                 <Mail size={14} /> {displayUser?.email}
//                             </p>
//                             <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
//                                 <div className={`px-5 py-2 rounded-2xl border ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
//                                     <p className="text-[10px] font-black uppercase opacity-40">Joined</p>
//                                     <p className="text-xs font-bold">{memberSince}</p>
//                                 </div>
//                                 <div className={`px-5 py-2 rounded-2xl border ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
//                                     <p className="text-[10px] font-black uppercase opacity-40">Status</p>
//                                     <p className="text-xs font-bold text-green-500">Active Account</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Logout */}
//                         <button onClick={() => dispatch(logout())} className="px-8 py-4 rounded-3xl bg-red-500/10 text-red-500 font-black text-xs tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 flex items-center gap-2">
//                             <LogOut size={18} /> SIGN OUT
//                         </button>
//                     </div>
//                 </motion.div>

//                 {/* MAIN DASHBOARD GRID */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                     {/* STATS COLUMN */}
//                     <div className="space-y-6">
//                         <StatWidget icon={<ShoppingCart />} label="In Your Cart" value={cartCount} sub="Items waiting" color="orange" isDark={isDark} />
//                         <StatWidget icon={<Package />} label="Total Orders" value={orderCount} sub="Lifetime orders" color="blue" isDark={isDark} />
//                         <StatWidget icon={<Star />} label="Reward Points" value="1,240" sub="Gold Member" color="green" isDark={isDark} />
//                     </div>

//                     {/* CONTENT COLUMN (Tabs) */}
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className={`rounded-[3rem] overflow-hidden shadow-xl ${isDark ? "bg-[#121214] border border-white/5" : "bg-white"}`}>
//                             {/* Custom Tabs */}
//                             <div className="flex p-2 gap-2 bg-black/5 m-4 rounded-2xl">
//                                 <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Overview" />
//                                 <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} label="Orders" />
//                                 <TabButton active={activeTab === 'cart'} onClick={() => setActiveTab('cart')} label="Cart" />
//                             </div>

//                             <div className="p-8 pt-4 min-h-[400px]">
//                                 <AnimatePresence mode="wait">
//                                     {loading ? (
//                                         <div className="h-64 flex flex-col items-center justify-center opacity-30"><Loader2 className="animate-spin mb-2" /> Syncing...</div>
//                                     ) : (
//                                         <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>

//                                             {activeTab === 'overview' && (
//                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                                     <InfoBox icon={<Wallet />} label="Payment Method" value="Visa Ending 4242" isDark={isDark} />
//                                                     <InfoBox icon={<Clock />} label="Last Activity" value="2 Minutes ago" isDark={isDark} />
//                                                     <InfoBox icon={<Shield />} label="Account Security" value="Strong (2FA On)" isDark={isDark} />
//                                                     <InfoBox icon={<User />} label="Profile ID" value={displayUser?._id?.slice(-10)} isDark={isDark} />
//                                                 </div>
//                                             )}

//                                             {activeTab === 'orders' && (
//                                                 <div className="space-y-4">
//                                                     {displayUser?.orders?.length > 0 ? displayUser.orders.map((o, i) => (
//                                                         <ListItem key={i} title={`Order #${o._id?.slice(-6).toUpperCase()}`} sub="Processing" price="₹4,999" icon={<Package />} color="blue" isDark={isDark} />
//                                                     )) : <EmptyState msg="No orders yet" />}
//                                                 </div>
//                                             )}

//                                             {activeTab === 'cart' && (
//                                                 <div className="space-y-4">
//                                                     {displayUser?.cart?.length > 0 ? displayUser.cart.map((c, i) => (
//                                                         <ListItem key={i} title="Product Item" sub={`Quantity: ${c.quantity}`} price="View Detail" icon={<ShoppingCart />} color="orange" isDark={isDark} />
//                                                     )) : <EmptyState msg="Cart is empty" />}
//                                                 </div>
//                                             )}

//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// }

// // UI HELPERS
// function StatWidget({ icon, label, value, sub, color, isDark }) {
//     const themeColor = color === 'orange' ? 'text-orange-500' : color === 'blue' ? 'text-blue-500' : 'text-green-500';
//     return (
//         <motion.div whileHover={{ y: -5 }} className={`p-8 rounded-[2.5rem] relative overflow-hidden transition-all shadow-lg ${isDark ? "bg-[#121214] border border-white/5" : "bg-white border border-gray-100"}`}>
//             <div className={`absolute top-0 right-0 p-6 opacity-10 ${themeColor}`}>{icon}</div>
//             <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{label}</p>
//             <h3 className="text-4xl font-black mb-1">{value}</h3>
//             <p className="text-[10px] font-bold opacity-60 uppercase">{sub}</p>
//         </motion.div>
//     );
// }

// function TabButton({ active, onClick, label }) {
//     return (
//         <button onClick={onClick} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? "bg-[#F54D27] text-white shadow-lg" : "text-gray-500 hover:text-gray-900"}`}>
//             {label}
//         </button>
//     );
// }

// function InfoBox({ icon, label, value, isDark }) {
//     return (
//         <div className={`p-6 rounded-3xl border ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
//             <div className="flex items-center gap-4">
//                 <div className="text-[#F54D27] opacity-50">{icon}</div>
//                 <div>
//                     <p className="text-[9px] font-black uppercase opacity-40 tracking-widest">{label}</p>
//                     <p className="text-sm font-bold">{value}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function ListItem({ title, sub, price, icon, color, isDark }) {
//     const iconColor = color === 'blue' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500';
//     return (
//         <div className={`p-5 rounded-3xl flex items-center justify-between border transition-all hover:scale-[1.01] ${isDark ? "bg-white/5 border-white/5" : "bg-white border-gray-100"}`}>
//             <div className="flex items-center gap-4">
//                 <div className={`p-3 rounded-2xl ${iconColor}`}>{icon}</div>
//                 <div>
//                     <p className="font-black text-xs tracking-tight">{title}</p>
//                     <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{sub}</p>
//                 </div>
//             </div>
//             <p className="font-black text-xs text-[#F54D27]">{price}</p>
//         </div>
//     );
// }

// function EmptyState({ msg }) {
//     return <div className="h-48 flex items-center justify-center opacity-20 text-[10px] font-black uppercase tracking-widest italic">{msg}</div>;
// }











"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUser } from "../Redux/authslice";
import { useRouter } from "next/navigation";
import { useTheme } from "../Redux/contextapi";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Mail, Shield, LogOut, ShoppingCart, Package,
    Calendar, AlertCircle, Loader2, IndianRupee,
    ChevronRight, Wallet, Star, Clock
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const dispatch = useDispatch();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("overview");
    const [fullUser, setFullUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Dynamic ID handling
    const userid = user?.userdata?._id || user?.data?.userId || user?._id;

    useEffect(() => {
        const fetchData = async () => {

            console.log('userud', userid)
            if (!userid) return;
            try {
                setLoading(true);
                const res = await axios.get(`/api/profile/${userid}`);

                console.log('userdatares', res)

                if (res.data.success) {
                    setFullUser(res.data.user);
                    // Sync with Redux so Header count also updates
                    console.log('res', res)
                    dispatch(updateUser(res.data.user));
                }
            } catch (err) {
                console.error("Profile Fetch Error:", err);
                toast.error("Failed to sync live data.");
            } finally {
                setLoading(false);
            }
        };
        if (isLoggedIn) fetchData();
    }, [userid, dispatch, isLoggedIn]);

    // Priority: 1. Full data from API, 2. Redux userdata, 3. Redux user root
    const displayUser = fullUser || user?.userdata || user;

    // --- LIVE COUNTS FROM DATA ---
    const cartCount = displayUser?.cart?.length || 0;
    const orderCount = displayUser?.orders?.length || 0;
    const memberSince = displayUser?.createdAt
        ? new Date(displayUser.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
        : "N/A";

    if (!isLoggedIn) {
        return (
            <div className="h-screen flex items-center justify-center font-sans bg-[#0a0a0b] text-white">
                <div className="text-center p-10 border border-white/10 rounded-[3rem] bg-white/5 backdrop-blur-xl">
                    <AlertCircle className="mx-auto mb-4 text-[#F54D27]" size={48} />
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">Access Denied</h2>
                    <p className="opacity-50 text-sm mb-6">Please login to view your profile.</p>
                    <button onClick={() => router.push('/login')} className="px-10 py-4 bg-[#F54D27] rounded-2xl font-black text-xs tracking-widest hover:scale-105 transition-all">GO TO LOGIN</button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen py-10 px-4 font-sans transition-colors duration-500 ${isDark ? "bg-[#0a0a0b] text-white" : "bg-[#f8f9fa] text-gray-900"}`}>
            <div className="max-w-6xl mx-auto">

                {/* TOP HERO SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className={`relative p-8 md:p-12 rounded-[3.5rem] overflow-hidden mb-8 shadow-2xl ${isDark ? "bg-[#121214] border border-white/5" : "bg-white border border-gray-100"}`}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#F54D27]/10 blur-[100px] rounded-full -mr-20 -mt-20" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-[#F54D27] to-[#ff7e5f] rotate-6 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center shadow-2xl shadow-[#F54D27]/30">
                                <span className="text-5xl font-black text-white -rotate-6 group-hover:rotate-0 transition-transform">
                                    {displayUser?.name ? displayUser.name[0].toUpperCase() : "U"}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <h1 className="text-4xl font-black tracking-tighter uppercase">{displayUser?.name || "Guest User"}</h1>
                                <div className="p-1.5 bg-green-500/10 rounded-full"><Shield size={14} className="text-green-500" /></div>
                            </div>
                            <p className="text-sm font-bold opacity-40 flex items-center justify-center md:justify-start gap-2 uppercase tracking-widest">
                                <Mail size={14} /> {displayUser?.email}
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                                <div className={`px-5 py-2 rounded-2xl border ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
                                    <p className="text-[10px] font-black uppercase opacity-40">Member Since</p>
                                    <p className="text-xs font-bold">{memberSince}</p>
                                </div>
                                <div className={`px-5 py-2 rounded-2xl border ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
                                    <p className="text-[10px] font-black uppercase opacity-40">Account Status</p>
                                    <p className="text-xs font-bold text-green-500">Verified</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => dispatch(logout())} className="px-8 py-4 rounded-3xl bg-red-500/10 text-red-500 font-black text-xs tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 flex items-center gap-2">
                            <LogOut size={18} /> SIGN OUT
                        </button>
                    </div>
                </motion.div>

                {/* MAIN DASHBOARD GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* STATS COLUMN */}
                    <div className="space-y-6">
                        <StatWidget icon={<ShoppingCart />} label="In Your Cart" value={cartCount} sub="Items in bag" color="orange" isDark={isDark} />
                        <StatWidget icon={<Package />} label="Total Orders" value={orderCount} sub="Lifetime purchases" color="blue" isDark={isDark} />
                        <StatWidget icon={<Star />} label="Loyalty Points" value={orderCount * 10} sub="Points earned" color="green" isDark={isDark} />
                    </div>

                    {/* CONTENT COLUMN (Tabs) */}
                    <div className="lg:col-span-2">
                        <div className={`rounded-[3rem] overflow-hidden shadow-xl min-h-[550px] ${isDark ? "bg-[#121214] border border-white/5" : "bg-white"}`}>
                            <div className="flex p-2 gap-2 bg-black/5 m-6 rounded-2xl">
                                <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Overview" />
                                <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} label={`Orders (${orderCount})`} />
                                <TabButton active={activeTab === 'cart'} onClick={() => setActiveTab('cart')} label={`Cart (${cartCount})`} />
                            </div>

                            <div className="p-8 pt-0">
                                <AnimatePresence mode="wait">
                                    {loading ? (
                                        <div className="h-64 flex flex-col items-center justify-center opacity-30">
                                            <Loader2 className="animate-spin mb-2" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Fetching Data...</span>
                                        </div>
                                    ) : (
                                        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>

                                            {activeTab === 'overview' && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <InfoBox icon={<Wallet />} label="Default Payment" value="Not Linked" isDark={isDark} />
                                                    <InfoBox icon={<Clock />} label="Last Updated" value={new Date(displayUser?.updatedAt).toLocaleTimeString()} isDark={isDark} />
                                                    <InfoBox icon={<Shield />} label="Security" value="Level: High" isDark={isDark} />
                                                    <InfoBox icon={<User />} label="Unique ID" value={displayUser?._id?.slice(-12)} isDark={isDark} />
                                                </div>
                                            )}

                                            {activeTab === 'orders' && (
                                                <div className="space-y-4">
                                                    {displayUser?.orders?.length > 0 ? displayUser.orders.map((o, i) => (
                                                        <ListItem key={i} title={`Order #${o._id?.slice(-6).toUpperCase()}`} sub="Standard Delivery" price="View Details" icon={<Package />} color="blue" isDark={isDark} />
                                                    )) : <EmptyState msg="You haven't ordered anything yet." />}
                                                </div>
                                            )}

                                            {activeTab === 'cart' && (
                                                <div className="space-y-4">
                                                    {displayUser?.cart?.length > 0 ? displayUser.cart.map((c, i) => (
                                                        <ListItem key={i} title="Bag Item" sub={`Qty: ${c.quantity}`} price="In Cart" icon={<ShoppingCart />} color="orange" isDark={isDark} />
                                                    )) : <EmptyState msg="Your cart is currently empty." />}
                                                </div>
                                            )}

                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// UI HELPERS (StatWidget, TabButton, InfoBox, ListItem, EmptyState components remain the same as defined in previous parts)
function StatWidget({ icon, label, value, sub, color, isDark }) {
    const themeColor = color === 'orange' ? 'text-orange-500' : color === 'blue' ? 'text-blue-500' : 'text-green-500';
    return (
        <motion.div whileHover={{ y: -5 }} className={`p-8 rounded-[2.5rem] relative overflow-hidden transition-all shadow-lg ${isDark ? "bg-[#121214] border border-white/5" : "bg-white border border-gray-100"}`}>
            <div className={`absolute top-0 right-0 p-6 opacity-10 ${themeColor}`}>{icon}</div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{label}</p>
            <h3 className="text-4xl font-black mb-1">{value}</h3>
            <p className="text-[10px] font-bold opacity-60 uppercase">{sub}</p>
        </motion.div>
    );
}

function TabButton({ active, onClick, label }) {
    return (
        <button onClick={onClick} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? "bg-[#F54D27] text-white shadow-lg" : "text-gray-500 hover:text-gray-900"}`}>
            {label}
        </button>
    );
}

function InfoBox({ icon, label, value, isDark }) {
    return (
        <div className={`p-6 rounded-3xl border ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
            <div className="flex items-center gap-4">
                <div className="text-[#F54D27] opacity-50">{icon}</div>
                <div className="overflow-hidden">
                    <p className="text-[9px] font-black uppercase opacity-40 tracking-widest">{label}</p>
                    <p className="text-sm font-bold truncate">{value || "N/A"}</p>
                </div>
            </div>
        </div>
    );
}

function ListItem({ title, sub, price, icon, color, isDark }) {
    const iconColor = color === 'blue' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500';
    return (
        <div className={`p-5 rounded-3xl flex items-center justify-between border transition-all hover:scale-[1.01] ${isDark ? "bg-white/5 border-white/5" : "bg-white border-gray-100"}`}>
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${iconColor}`}>{icon}</div>
                <div>
                    <p className="font-black text-xs tracking-tight">{title}</p>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{sub}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p className="font-black text-[10px] uppercase text-[#F54D27]">{price}</p>
                <ChevronRight size={14} className="opacity-30" />
            </div>
        </div>
    );
}

function EmptyState({ msg }) {
    return <div className="h-48 flex flex-col items-center justify-center opacity-20 text-[10px] font-black uppercase tracking-widest italic text-center p-10">{msg}</div>;
}
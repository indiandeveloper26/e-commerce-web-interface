"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../Redux/contextapi";
import { toast } from "react-toastify";
import { Upload, X, ChevronLeft, Save, Sparkles, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function AddProductPage() {
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        price: "",
        discountPrice: "",
        currency: "INR",
        category: "",
        brand: "",
        stock: "",
        attributes: { size: [], color: [], material: "" },
        isActive: true,
    });

    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("attributes.")) {
            const attr = name.split(".")[1];
            setForm(prev => ({
                ...prev,
                attributes: {
                    ...prev.attributes,
                    [attr]: (attr === "size" || attr === "color") ? value.split(",") : value
                }
            }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFiles = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            for (const key in form) {
                data.append(key, key === "attributes" ? JSON.stringify(form[key]) : form[key]);
            }
            images.forEach(img => data.append("images", img));

            const res = await fetch("/api/listproducts", { method: "POST", body: data });
            if (!res.ok) throw new Error("Upload failed");

            toast.success("Product listed live!");
            router.push("/products");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const sectionClass = `p-8 rounded-[2rem] border ${isDark ? "bg-gray-800/40 border-gray-700" : "bg-white border-gray-100 shadow-sm"}`;
    const labelClass = "text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block";
    const inputClass = `w-full p-4 rounded-2xl text-sm font-bold border outline-none transition-all ${isDark ? "bg-gray-900 border-gray-700 focus:border-[#F54D27]" : "bg-gray-50 border-gray-200 focus:border-[#F54D27]"
        }`;

    return (
        <section className={`min-h-screen py-12 ${isDark ? "bg-[#0f1115] text-white" : "bg-gray-50 text-gray-900"}`}>
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <button onClick={() => router.back()} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity uppercase text-[10px] font-black tracking-widest">
                        <ChevronLeft size={16} /> Back to Inventory
                    </button>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                        New Product<span className="text-[#F54D27]">.</span>
                    </h1>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-4 bg-[#F54D27] text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                    >
                        {loading ? "Syncing..." : <><Save size={16} /> Save Product</>}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Main Info */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className={sectionClass}>
                            <h3 className="text-lg font-black italic uppercase mb-6 flex items-center gap-2">
                                <Sparkles size={20} className="text-[#F54D27]" /> Core Identity
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className={labelClass}>Product Title</label>
                                    <input type="text" name="name" placeholder="e.g. Vintage Leather Jacket" onChange={handleChange} className={inputClass} required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>SEO Slug</label>
                                        <input type="text" name="slug" placeholder="vintage-leather-jacket" onChange={handleChange} className={inputClass} required />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Brand Name</label>
                                        <input type="text" name="brand" placeholder="Supreme / Nike" onChange={handleChange} className={inputClass} />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Full Narrative</label>
                                    <textarea name="description" placeholder="Describe the lifestyle and benefits..." onChange={handleChange} className={inputClass} rows={5} />
                                </div>
                            </div>
                        </div>

                        <div className={sectionClass}>
                            <h3 className="text-lg font-black italic uppercase mb-6 flex items-center gap-2">
                                <ImageIcon size={20} className="text-[#F54D27]" /> Visual Assets
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {previews.map((src, i) => (
                                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-700">
                                        <Image src={src} alt="" fill className="object-cover" />
                                        <button onClick={() => removeImage(i)} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                                <label className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${isDark ? "border-gray-700 hover:border-[#F54D27] bg-gray-900" : "border-gray-200 hover:border-[#F54D27] bg-gray-50"
                                    }`}>
                                    <Upload size={20} className="opacity-20 mb-2" />
                                    <span className="text-[8px] font-black uppercase tracking-widest opacity-30">Add Image</span>
                                    <input type="file" multiple onChange={handleFiles} className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Settings */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className={sectionClass}>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F54D27] mb-6">Pricing & Inventory</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClass}>Base Price (₹)</label>
                                    <input type="number" name="price" placeholder="0.00" onChange={handleChange} className={inputClass} required />
                                </div>
                                <div>
                                    <label className={labelClass}>Sale Price (₹)</label>
                                    <input type="number" name="discountPrice" placeholder="0.00" onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Stock Quantity</label>
                                    <input type="number" name="stock" placeholder="100" onChange={handleChange} className={inputClass} />
                                </div>
                            </div>
                        </div>

                        <div className={sectionClass}>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F54D27] mb-6">Specifications</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClass}>Category</label>
                                    <input type="text" name="category" placeholder="Apparel" onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Sizes (comma separated)</label>
                                    <input type="text" name="attributes.size" placeholder="S, M, L, XL" onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Colors</label>
                                    <input type="text" name="attributes.color" placeholder="Black, Grey, Navy" onChange={handleChange} className={inputClass} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../Redux/contextapi";
import { toast } from "react-toastify";

export default function AddProductPage() {
    const router = useRouter();
    const { theme } = useTheme();

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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("attributes.")) {
            const attr = name.split(".")[1];
            if (attr === "size" || attr === "color") {
                setForm(prev => ({
                    ...prev,
                    attributes: { ...prev.attributes, [attr]: value.split(",") }
                }));
            } else {
                setForm(prev => ({
                    ...prev,
                    attributes: { ...prev.attributes, [attr]: value }
                }));
            }
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFiles = (e) => setImages([...e.target.files]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            for (const key in form) {
                if (key === "attributes") {
                    data.append(key, JSON.stringify(form[key]));
                } else {
                    data.append(key, form[key]);
                }
            }
            images.forEach(img => data.append("images", img));

            const res = await fetch("/api/listproducts", { method: "POST", body: data });
            if (!res.ok) throw new Error("Upload failed");

            toast.success("Product added successfully!");
            router.push("/products");
        } catch (err) {
            console.error(err);
            toast.error("Error adding product: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const bgClass = theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900";
    const inputClass =
        theme === "dark"
            ? "w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F54D27] focus:border-[#F54D27] transition"
            : "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F54D27] focus:border-[#F54D27] transition";

    const buttonClass =
        "w-full py-3 mt-4 text-white font-semibold rounded-lg transition-all duration-300 " +
        "bg-[#F54D27] hover:bg-[#e04322] shadow-md hover:shadow-lg";

    return (
        <section className={`${bgClass} min-h-screen py-10`}>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>

                <form className="space-y-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} className={inputClass} required />
                    <input type="text" name="slug" placeholder="Slug (SEO friendly)" onChange={handleChange} className={inputClass} required />
                    <textarea name="description" placeholder="Description" onChange={handleChange} className={inputClass} rows={4} />
                    <textarea name="shortDescription" placeholder="Short Description" onChange={handleChange} className={inputClass} rows={2} />
                    <input type="number" name="price" placeholder="Price" onChange={handleChange} className={inputClass} required />
                    <input type="number" name="discountPrice" placeholder="Discount Price" onChange={handleChange} className={inputClass} />
                    <input type="text" name="category" placeholder="Category" onChange={handleChange} className={inputClass} />
                    <input type="text" name="brand" placeholder="Brand" onChange={handleChange} className={inputClass} />
                    <input type="number" name="stock" placeholder="Stock" onChange={handleChange} className={inputClass} />
                    <input type="text" name="attributes.size" placeholder="Sizes (S,M,L)" onChange={handleChange} className={inputClass} />
                    <input type="text" name="attributes.color" placeholder="Colors (red,blue)" onChange={handleChange} className={inputClass} />
                    <input type="text" name="attributes.material" placeholder="Material" onChange={handleChange} className={inputClass} />

                    <input type="file" multiple onChange={handleFiles} className={inputClass} />

                    <button type="submit" disabled={loading} className={buttonClass}>
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </section>
    );
}

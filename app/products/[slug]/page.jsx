"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [adding, setAdding] = useState(false);

    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/listproducts/${params.slug}`, { cache: "no-store" });
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.slug]);

    // const handleAddToCart = () => {

    //     console.log('data', product._id)
    //     // Example: Add product to local storage cart
    //     let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    //     cart.push({ ...product, quantity: 1 });
    //     localStorage.setItem("cart", JSON.stringify(cart));
    //     alert("Product added to cart!");
    // };

    const handleAddToCart = async () => {

        let userId = user.userdata._id

        console.log(user.userdata._id)
        try {


            if (!product._id) {
                alert("Please login first");
                router.push("/login");
                return;
            }

            // alert('jao')

            setAdding(true);

            const res = await fetch("/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    productId: product._id,
                }),
            });

            const data = await res.json();
            console.log(data)

            if (!res.ok) {
                throw new Error(data.message || "Failed to add to cart");
            }

            toast.success("successfully add to cart")
        } catch (err) {
            alert(err.message || "Something went wrong");
        } finally {
            setAdding(false);
        }
    };

    const handleBuyNow = () => {
        // Example: Add to cart and navigate to checkout
        localStorage.setItem("buyNowProduct", JSON.stringify(product));
        // Redirect to checkout
        router.push("/checkout");
        // router.push("/checkout");
    };

    if (loading) return <p className="text-center py-8 text-gray-500">Loading product...</p>;
    if (error) return <p className="text-center py-8 text-red-500">Error: {error}</p>;
    if (!product) return <p className="text-center py-8 text-gray-500">Product not found</p>;

    return (
        <section className="container mx-auto px-4 py-8">
            <button
                className="mb-4 text-blue-600 hover:underline"
                onClick={() => router.back()}
            >
                ← Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Images */}
                <div className="space-y-2">
                    {product.images?.length > 0 ? (
                        product.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={product.name}
                                className="w-full object-cover rounded shadow"
                            />
                        ))
                    ) : (
                        <img
                            src="/placeholder.png"
                            alt="placeholder"
                            className="w-full object-cover rounded shadow"
                        />
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-500 mt-1">{product.category}</p>
                    <p className="mt-2 text-gray-700">{product.description}</p>

                    <div className="mt-4 flex items-center gap-3">
                        <span className="text-xl font-bold text-blue-700">₹{product.price}</span>
                        {product.discountPrice && (
                            <span className="line-through text-gray-400">₹{product.discountPrice}</span>
                        )}
                    </div>

                    <div className="mt-4 space-y-1">
                        <p><strong>Brand:</strong> {product.brand}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                        <p><strong>Sizes:</strong> {product.attributes?.size?.join(", ") || "N/A"}</p>
                        <p><strong>Colors:</strong> {product.attributes?.color?.join(", ") || "N/A"}</p>
                        <p><strong>Material:</strong> {product.attributes?.material || "N/A"}</p>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition font-semibold"
                        >
                            Buy Now
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition font-semibold"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}




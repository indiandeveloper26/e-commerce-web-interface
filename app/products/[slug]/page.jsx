"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { fetchProducts } from "../../Redux/productsSlice";
import Image from "next/image";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const [id, setid] = useState("")

    console.log('slug', params)

    const { products, loading, error } = useSelector((state) => state.products);
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    const [product, setProduct] = useState(null);
    console.log('fsadf', products)

    useEffect(() => {

        let dat = async () => {
            let data = localStorage.getItem("id")
            console.log('idd', data)
            setid(data)
        }
        dat()
    }, [])


    // Filter product from Redux store
    useEffect(() => {

        if (products.length > 0) {
            const found = products.find((p) => p.slug === params.slug);
            if (found) {
                setProduct(found);
            } else {
                // agar store me nahi hai, to fetch all products
                dispatch(fetchProducts());
            }
        } else {
            // agar store empty hai, fetch products
            dispatch(fetchProducts());
        }
    }, [products, params.slug, dispatch]);

    // Update product if fetchProducts finished loading
    useEffect(() => {
        if (!product && products.length > 0) {
            const found = products.find((p) => p.slug === params.slug);
            if (found) setProduct(found);
        }
    }, [products, product, params.slug]);
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async () => {

        console.log('loging', isLoggedIn)
        if (!isLoggedIn) {
            toast.error("Please login first");
            // router.push("/login");
            return;
        }
        setAdding(true);
        try {
            const res = await fetch("/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: id, productId: product._id }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to add to cart");
            toast.success("Successfully added to cart");
            setAdding(false);
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        }
    };

    const handleBuyNow = () => {
        localStorage.setItem("buyNowProduct", JSON.stringify(product));
        router.push("/checkout");
    };

    if (loading) return <p className="text-center py-8 text-gray-500">Loading product...</p>;
    if (error) return <p className="text-center py-8 text-red-500">Error: {error}</p>;
    if (!product) return <p className="text-center py-8 text-gray-500">Product not found</p>;

    return (
        <section className="container mx-auto px-4 py-8">
            <button className="mb-4 text-[#F54D27] hover:underline" onClick={() => router.back()}>
                ← Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Images */}


                <div className="space-y-2">
                    {product.images?.length ? (
                        product.images.map((img, idx) => (
                            <div key={idx} className="relative w-full h-64">
                                <Image
                                    src={img}
                                    alt={product.name}
                                    fill // Image ko parent div me full fill karne ke liye
                                    className="object-cover rounded shadow"
                                    sizes="(max-width: 768px) 100vw, 50vw" // responsive sizes
                                />
                            </div>
                        ))
                    ) : (
                        <div className="relative w-full h-64">
                            <Image
                                src="/placeholder.png"
                                alt="placeholder"
                                fill
                                className="object-cover rounded shadow"
                                sizes="100vw"
                            />
                        </div>
                    )}
                </div>


                {/* Details */}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-500 mt-1">{product.category}</p>
                    <p className="mt-2 text-gray-700">{product.description}</p>

                    <div className="mt-4 flex items-center gap-3">
                        <span className="text-xl font-bold text-[#F54D27]">₹{product.price}</span>
                        {product.discountPrice && <span className="line-through text-gray-400">₹{product.discountPrice}</span>}
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <button onClick={handleBuyNow} className="flex-1 bg-[#F54D27] text-white py-3 px-4 rounded hover:bg-[#e04322] transition font-semibold">
                            Buy Now
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={adding} // button disable ho jayega jab loading ho
                            className={`flex-1 py-3 px-4 rounded font-semibold transition 
    ${adding ? "bg-gray-400 cursor-not-allowed" : "bg-[#F54D27] hover:bg-[#e04322] text-white"}`}
                        >
                            {adding ? "Adding..." : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

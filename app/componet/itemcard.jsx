import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition bg-white dark:bg-gray-900">
            <Link href={`/products/${product.slug}`}>
                <img
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </Link>

            <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {product.shortDescription}
                </p>

                <div className="mt-2 flex items-center gap-2">
                    {product.discountPrice ? (
                        <>
                            <span className="text-lg font-bold text-green-600">
                                ₹{product.discountPrice}
                            </span>
                            <span className="line-through text-gray-500">₹{product.price}</span>
                        </>
                    ) : (
                        <span className="text-lg font-bold">₹{product.price}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

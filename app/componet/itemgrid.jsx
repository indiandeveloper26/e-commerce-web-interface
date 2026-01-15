import ProductCard from "./itemcard";


export default function ProductGrid({ products }) {
    if (!products || products.length === 0) return <p>No products found.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
                <ProductCard key={p._id} product={p} />
            ))}
        </div>
    );
}

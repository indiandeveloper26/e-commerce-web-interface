export default function page() {
    return (
        <div className="max-w-4xl mx-auto p-8 text-gray-800">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4 text-sm text-gray-500">Effective Date: 01/02/2026</p>
            <div className="space-y-4">
                <p>At <strong>Soyab Akhtar</strong>, we value your privacy. This policy describes how we collect and use your data.</p>
                <h2 className="text-xl font-semibold">Information Collection</h2>
                <p>We collect your name, email, and GST details for billing. Payment information is securely handled by our partner <strong>PayU</strong>.</p>
                <h2 className="text-xl font-semibold">Security</h2>
                <p>We use industry-standard encryption to protect your data during transmission.</p>
            </div>
        </div>
    );
}
export default function page() {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Refund & Cancellation</h1>
            <div className="space-y-4">
                <p>We believe in transparent business practices.</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Refunds:</strong> Eligible refunds are processed within 5-7 working days.</li>
                    <li><strong>Cancellation:</strong> Orders can be cancelled within 24 hours of booking.</li>
                    <li><strong>Method:</strong> All refunds will be credited back to the original payment method used via PayU.</li>
                </ul>
            </div>
        </div>
    );
}
// dummyOrders.js
export const dummyOrders = Array.from({ length: 50 }, (_, i) => ({
    _id: `order${i + 1}`,
    userId: '6960b6746358147923ff52a0',
    products: [
        {
            product: {
                _id: `prod${i + 1}`,
                name: `Product ${i + 1}`,
                price: Math.floor(Math.random() * 500) + 100,
                images: [`/images/prod${i + 1}.png`],
            },
            quantity: Math.floor(Math.random() * 3) + 1,
            price: Math.floor(Math.random() * 500) + 100,
        },
    ],
    totalPrice: Math.floor(Math.random() * 2000) + 500,
    status: Math.random() > 0.5 ? "Paid" : "Pending",
    address: `Sample Address ${i + 1}`,
    paymentMethod: "Online",
    createdAt: new Date(Date.now() - i * 3600 * 1000).toISOString(),
}));




// app/api/order/test/route.js
import { NextResponse } from "next/server";


export async function GET(req) {
    const { searchParams } = new URL(req.url);

    // Get page and limit from query params
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const userId = '6960b6746358147923ff52a0'; // hardcoded user for test

    // Filter orders by userId
    const userOrders = dummyOrders.filter(order => order.userId === userId);

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = userOrders.slice(startIndex, endIndex);

    return NextResponse.json({
        success: true,
        page,
        limit,
        totalOrders: userOrders.length,
        orders: paginatedOrders,
    });
}

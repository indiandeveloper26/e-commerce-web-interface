// app/api/auth/logout/route.js  (Next 13+ app router)
import { NextResponse } from "next/server";

export async function GET() {
    // Cookie clear karne ke liye
    const response = NextResponse.json({ message: "Logged out successfully" });

    // Agar tumhare cookie ka naam 'token' hai
    response.cookies.set("token", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(0), // expire immediately
    });

    return response;
}

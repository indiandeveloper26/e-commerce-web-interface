// middleware.js
import { NextResponse } from "next/server";
import { verifyToken } from "./app/lib/auth";


export function proxy(req) {
    const token = req.cookies.get("token")?.value;

    console.log('token ', token)

    // // Allow login/signup pages without auth
    // if (req.nextUrl.pathname.startsWith("/login") ||
    //     req.nextUrl.pathname.startsWith("/signup")) {
    //     return NextResponse.next();
    // }

    if (!token) {
        return NextResponse.redirect(new URL("/products", req.url));
    }

    try {
        verifyToken(token); // will throw if invalid
        return NextResponse.next(); // valid, proceed
    } catch (err) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

// Protect all pages except login/signup/public API

export const config = {
    matcher: [
        '/about/:path*',
        '/itemlist/:path*',
        '/contact',          // you can also match exact paths
    ],
};


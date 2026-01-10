// lib/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "qwsdrt123456";

/**
 * Generate JWT token
 */
export function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verify JWT token
 * @returns decoded payload if valid, throws error if invalid
 */
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

/**
 * Create a cookie object for NextResponse
 */
export function setTokenCookie(response, token) {
    response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
}

/**
 * Remove cookie (logout)
 */
export function clearTokenCookie(response) {
    response.cookies.set("token", "", { maxAge: 0, path: "/" });
}

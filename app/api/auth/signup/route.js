// // import bcrypt from "bcryptjs";
// // import dbConnect from "../../../lib/mongodb";
// // import Usercrate from "../../../models/User";
// // import { NextResponse } from "next/server";

// // export async function POST(request) {
// //     try {
// //         const body = await request.json();
// //         const { name, email, password, phoneNumber } = body;

// //         console.log("Request body:", body);

// //         // Validate required fields
// //         if (!name || !email || !password) {
// //             return new NextResponse(
// //                 JSON.stringify({ error: "Name, email, and password are required." }),
// //                 { status: 400 }
// //             );
// //         }

// //         // Connect to MongoDB
// //         await dbConnect();

// //         // Check if user already exists
// //         const existingUser = await Usercrate.findOne({ email });
// //         if (existingUser) {
// //             return new NextResponse(
// //                 JSON.stringify({ error: "User with this email already exists." }),
// //                 { status: 409 }
// //             );
// //         }

// //         // Hash password
// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         // Create new user
// //         const user = await Usercrate.create({
// //             name,
// //             email,
// //             password: hashedPassword,
// //             phoneNumber: phoneNumber || undefined, // prevent null insert
// //         });

// //         // Return success response
// //         return new NextResponse(
// //             JSON.stringify({ message: "User created", userId: user._id }),
// //             { status: 201 }



// //         );
// //     } catch (error) {
// //         console.error("Signup error:", error);

// //         // Handle MongoDB duplicate key error (just in case)
// //         if (error.code === 11000) {
// //             const field = Object.keys(error.keyPattern)[0];
// //             return new NextResponse(
// //                 JSON.stringify({ error: `${field} already exists.` }),
// //                 { status: 409 }
// //             );
// //         }

// //         // Generic server error
// //         return new NextResponse(
// //             JSON.stringify({ error: "Internal Server Error" }),
// //             { status: 500 }
// //         );
// //     }
// // }















import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/mongodb";
import Usercrate from "../../../models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "qwsdrt123456";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, password, phoneNumber } = body;

        console.log("Request body:", body);

        // Validate required fields
        if (!name || !email || !password) {
            return new NextResponse(
                JSON.stringify({ error: "Name, email, and password are required." }),
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await dbConnect();

        // Check if user already exists
        const existingUser = await Usercrate.findOne({ email });
        if (existingUser) {
            return new NextResponse(
                JSON.stringify({ error: "User with this email already exists." }),
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await Usercrate.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber: phoneNumber || undefined, // prevent null insert
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Create NextResponse
        const response = NextResponse.json({
            message: "User created and logged in",
            user: user,
            userId: user._id,
        }, { status: 201 });

        // Set HttpOnly cookie with token
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            secure: process.env.NODE_ENV === "production", // secure in prod
            sameSite: "lax",
        });

        return response;

    } catch (error) {
        console.error("Signup error:", error);

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return new NextResponse(
                JSON.stringify({ error: `${field} already exists.` }),
                { status: 409 }
            );
        }

        // Generic server error
        return new NextResponse(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}

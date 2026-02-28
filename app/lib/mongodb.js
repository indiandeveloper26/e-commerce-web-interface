import mongoose from "mongoose";

const MONGODB_URI = 'mongodb+srv://akgaud079:sahilmummy@cluster0.pcpf2.mongodb.net/'

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;




// import mongoose from "mongoose";






// const MONGODB_URI = 'mongodb+srv://akgaud079:sahilmummy@cluster0.pcpf2.mongodb.net/'



// async function dbConnect() {
//     try {
//         if (!MONGODB_URI) {
//             throw new Error("❌ MONGODB_URI missing in .env.local");
//         }

//         console.log("🟡 Connecting to MongoDB...");

//         await mongoose.connect(MONGODB_URI, {
//             serverSelectionTimeoutMS: 10000,
//         });

//         console.log("✅ MongoDB connected successfully");
//         process.exit(0);
//     } catch (error) {
//         console.error("❌ MongoDB connection failed");
//         console.error("👉", error.message);
//         process.exit(1);
//     }
// }

// dbConnect();

// export default dbConnect;
import mongoose from "mongoose";




console.log("hiidb"); // debug

const MONGODB_URI = 'mongodb+srv://akgaud079:sahilmummy@cluster0.pcpf2.mongodb.net/'



async function testDB() {
    try {
        if (!MONGODB_URI) {
            throw new Error("❌ MONGODB_URI missing in .env.local");
        }

        console.log("🟡 Connecting to MongoDB...");

        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("✅ MongoDB connected successfully");
        process.exit(0);
    } catch (error) {
        console.error("❌ MongoDB connection failed");
        console.error("👉", error.message);
        process.exit(1);
    }
}

testDB();
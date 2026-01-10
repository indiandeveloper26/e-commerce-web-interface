// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
    },
    { timestamps: true } // createdAt & updatedAt automatically
);

// Avoid recompiling model during hot reload (Next.js dev)
const Usercrate = mongoose.models.Usercrate || mongoose.model("Usercrate", UserSchema);
export default Usercrate;


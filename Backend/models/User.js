import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed Password
    mobile:{type: String},
    bio:{type:String},
    image: { type: String, default: "" }, // Profile image URL
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

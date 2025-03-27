import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Ensure JWT_SECRET is properly set
if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined! Check your environment variables.");
  process.exit(1);
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword || !trimmedName) {
      return res.status(400).json({ success: false, message: "Invalid input format" });
    }

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(trimmedPassword, salt);

    // ✅ Handle profile image
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newUser = new User({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      image, // Save image path
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        image: newUser.image, // Return image URL
      },
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const user = await User.findOne({ email: trimmedEmail }).select("+password");
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        bio:user.bio,
        mobile:user.mobile,
        email: user.email,
        image: user.image, // Return profile image
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

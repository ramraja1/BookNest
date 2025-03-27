import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ✅ Upload Profile Image
export const uploadProfileImage = async (req, res) => {
  try {
    // 1️⃣ Get token & verify user
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // 2️⃣ Validate Image
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const imageUrl = req.file.path; // Cloudinary URL

    // 3️⃣ Update user profile
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.image = imageUrl;
    await user.save();

    res.status(200).json({ success: true, imageUrl: user.image });
  } catch (error) {
    console.error("❌ Profile Upload Error:", error);
    res.status(500).json({ success: false, message: "Failed to upload profile image" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { name, mobile, bio, image } = req.body;

    console.log("🔹 Received Profile Update Data:", { name});

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });


    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (bio) user.bio = bio;
    if (image) user.image = image;

    await user.save();

    console.log("✅ Updated User");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("❌ Profile Update Error:", error);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};

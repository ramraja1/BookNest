import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const uploadProfileImage = async (req, res) => {
  try {
    // ✅ Get token from request headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    // ✅ Verify and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const imageUrl = req.file.path; // ✅ Cloudinary image URL

    // ✅ Update user profile
    const user = await User.findByIdAndUpdate(userId, { image: imageUrl }, { new: true });

    res.status(200).json({ success: true, imageUrl: user.image });
  } catch (error) {
    console.error("❌ Profile Upload Error:", error);
    res.status(500).json({ success: false, message: "Failed to upload profile image" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};

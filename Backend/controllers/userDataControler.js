import User from "../models/User.js";
import jwt from "jsonwebtoken"; // ✅ Import JWT for token verification

export const fetchData = async (req, res) => {
  try {
    // ✅ Extract token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    // ✅ Verify token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // ✅ Fetch user from database
    const user = await User.findById(userId).select("-password"); // Exclude password for security

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // ✅ Send user data
    res.status(200).json({ success: true, user });

  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

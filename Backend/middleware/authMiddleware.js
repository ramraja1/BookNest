import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async (req, res, next) => {
  try {
    console.log("🔹 Checking Authorization...");
    console.log("Headers:", req.headers.authorization);

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      console.log("🔹 Extracted Token:", token);

      if (!token) {
        return res.status(401).json({ message: "Not authorized, no token provided" });
      }

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("🔹 Decoded Token:", decoded);

      // Fetch user from database
      const user = await User.findById(decoded.id).select("-password");
      console.log("🔹 User Found:", user);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; // Attach user to request object
      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error);
    res.status(401).json({ message: "Not authorized", error: error.message });
  }
};

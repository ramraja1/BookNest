import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // ✅ Import user routes
import bookRoutes from "./routes/bookRoutes.js";// ✅ Import book routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // ✅ Use user routes
app.use("/api/books", bookRoutes);

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the Old Book Marketplace API!");
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Failed:", err);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

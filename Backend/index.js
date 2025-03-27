import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import messageRoute from "./routes/messageRoute.js"
dotenv.config();

const app = express(); // ✅ Declare 'app' BEFORE using it
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ✅ Routes (AFTER 'app' is initialized)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes); // ✅ Moved below app declaration
app.use("/api",messageRoute)

// ✅ Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the Old Book Marketplace API!");
});

// ✅ MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Failed:", err);
        process.exit(1);
    });

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

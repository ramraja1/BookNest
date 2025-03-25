import express from "express";
import Book from "../models/bookModel.js";
import upload from "../middleware/uploadMiddleware.js"; // Middleware for image upload
import { protect } from "../middleware/authMiddleware.js"; // Middleware to check login
import mongoose from "mongoose";
const router = express.Router();

// 📌 Upload Book Image
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ imageUrl: req.file.path });
  } catch (error) { 
    res.status(500).json({ message: "Image upload failed", error });
  }
});
// 📌 Fetch all books listed by a specific user
router.get("/listings", protect, async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const books = await Book.find({ seller: new mongoose.Types.ObjectId(userId) }); // ✅ Convert to ObjectId
    res.json(books);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Error fetching book details", error: error.message });
  }
});

// 📌 Fetch a single book by ID (MUST be placed AFTER `/listings`)
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("seller", "name email description");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details", error });
  }
});


// 📌 Add a new book
router.post("/add", async (req, res) => {
  try {
    const { title, author, price, category, seller, image, description } = req.body;
    if (!title || !author || !price || !category || !seller || !image || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log(req.body);
    const book = new Book({ title, author, price, category, seller, image, description });
    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
});

// 📌 Fetch all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("seller", "name email");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// 📌 Update book details
router.put("/update/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Book updated", updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

// 📌 Delete a book
router.delete("/delete/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

export default router;

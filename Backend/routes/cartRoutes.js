import express from "express";
import Cart from "../models/Cart.js";
const router = express.Router();

// Add or update item in cart
router.post("/add", async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ bookId, quantity: 1 }] });
    } else {
      const item = cart.items.find((item) => item.bookId.toString() === bookId);
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ bookId, quantity: 1 });
      }
    }
    await cart.save();
    res.status(200).json(await cart.populate("items.bookId")); // ✅ Populate & return updated cart
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.bookId");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Remove item from cart
router.post("/remove", async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter((item) => item.bookId.toString() !== bookId);
      await cart.save();
    }
    res.status(200).json(await cart.populate("items.bookId")); // ✅ Populate & return updated cart
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// Clear entire cart
router.post("/clear", async (req, res) => {
  const { userId } = req.body;
  try {
    await Cart.findOneAndUpdate({ userId }, { items: [] });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


export default router;

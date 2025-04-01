import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage immediately
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        if (response.data.items) {
          setCart(response.data.items);
          localStorage.setItem("cart", JSON.stringify(response.data.items)); // Update localStorage
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  // ✅ Add book to cart
  const addToCart = async (book) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return alert("Please login first!");

      await axios.post("http://localhost:5000/api/cart/add", { userId, bookId: book._id });

      setCart((prevCart) => {
        const updatedCart = prevCart.some((item) => item.bookId._id === book._id)
          ? prevCart.map((item) =>
              item.bookId._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...prevCart, { ...book, quantity: 1 }];

        localStorage.setItem("cart", JSON.stringify(updatedCart)); // ✅ Store in localStorage
        return updatedCart;
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Remove book from cart
  const removeFromCart = async (bookId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      await axios.post("http://localhost:5000/api/cart/remove", { userId, bookId });

      setCart((prevCart) => {
        const updatedCart = prevCart.filter((item) => item.bookId._id !== bookId);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // ✅ Store in localStorage
        return updatedCart;
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // ✅ Clear the entire cart
  const clearCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      await axios.post("http://localhost:5000/api/cart/clear", { userId });

      setCart([]); // Reset cart state
      localStorage.removeItem("cart"); // ✅ Remove from localStorage
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

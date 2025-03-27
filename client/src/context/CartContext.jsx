import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch Cart Items on Mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setCart([]); // Clear cart if no user
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(response.data?.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []); // No dependencies -> Runs once on mount

  // Add Book to Cart
  const addToCart = async (book) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return alert("Please login first!");

      await axios.post("http://localhost:5000/api/cart/add", { userId, bookId: book._id });

      // Updating UI with full book details instead of just `bookId`
      setCart((prev) => [...prev, { ...book, quantity: 1 }]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook for Using Cart
export const useCart = () => useContext(CartContext);

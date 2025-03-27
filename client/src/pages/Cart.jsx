import { useState, useEffect } from "react";
import { Trash, CreditCard, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, book) => sum + book.price, 0);
    setTotalPrice(total);
  }, [cart]);

  // 🚫 Redirect unauthorized users



  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-10">
      <h2 className="text-5xl font-extrabold text-center text-gold mb-6">🛍️ Your Luxury Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-xl text-gray-400">Your cart is empty, billionaire!</p>
          <button
            onClick={() => navigate("/books")}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 transition transform duration-300 text-lg"
          >
            📚 Explore Exclusive Collections
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-[#161B22] shadow-2xl rounded-lg p-8">
          {cart.map((book) => (
            <div key={book._id} className="flex justify-between items-center border-b border-gray-700 pb-5 mb-5">
              <div className="flex items-center gap-6">
                <img
                  src={book.image || "/default-book.jpg"}
                  alt={book.title}
                  className="w-20 h-24 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h3 className="text-2xl font-semibold">{book.title}</h3>
                  <p className="text-gray-400 text-lg font-medium">₹{book.price.toLocaleString()}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(book._id)}
                className="text-red-500 hover:text-red-600 transition duration-300"
              >
                <Trash size={26} />
              </button>
            </div>
          ))}

          {/* 💎 Billionaire Checkout */}
          <div className="flex justify-between items-center mt-8 border-t border-gray-700 pt-6">
            <h3 className="text-3xl font-bold text-gold">💰 Total: ₹{totalPrice.toLocaleString()}</h3>
            <div className="flex gap-6">
              <button
                onClick={clearCart}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300 text-lg font-semibold"
              >
                ❌ Clear Cart
              </button>
              <button
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:scale-105 transition transform duration-300 flex items-center gap-3 text-lg font-semibold"
              >
                <CreditCard size={24} /> 🚀 Checkout Like a Billionaire
              </button>
            </div>
          </div>

          {/* AI Assistant Teaser */}
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-lg">💡 Coming Soon: AI Smart Checkout Assistance</p>
            <div className="flex justify-center mt-3">
              <Sparkles size={30} className="text-gold animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

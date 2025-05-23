import { useState, useEffect } from "react";
import { Trash, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.bookId?.price || 0), 0);
    setTotalPrice(total);
  }, [cart]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#F8F9FA] to-[#ECEFF1] text-[#2C3E50]">
      <h2 className="text-5xl font-extrabold text-center text-[#A67B5B] mb-6">
        🛍️ Your Luxury Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-xl text-gray-600">Your cart is empty, billionaire!</p>
          <button
            onClick={() => navigate("/books")}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-[#A67B5B] to-[#8B5E3B] text-white rounded-lg hover:scale-105 transition transform duration-300 text-lg shadow-lg"
          >
            📚 Explore Exclusive Collections
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-8 border border-gray-300">
          {cart.map((item) => {
            const book = item.bookId || {};

            return (
              <div
                key={book._id}
                className="flex justify-between items-center border-b border-gray-300 pb-5 mb-5 hover:bg-gray-100 p-4 rounded-lg transition duration-300"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={book.image || "/default-book.jpg"}
                    alt={book.title || "Book"}
                    className="w-20 h-24 object-cover rounded-lg shadow-md border border-gray-400"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-[#A67B5B]">{book.title || "Untitled"}</h3>
                    <p className="text-gray-600 text-lg font-medium">
                      ₹{book.price ? book.price.toLocaleString() : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/cart-detail/${book._id}`)}
                    className="text-blue-500 hover:text-blue-600 transition duration-300"
                  >
                    <Eye size={26} />
                  </button>
                  <button
                    onClick={() => removeFromCart(book._id)}
                    className="text-red-500 hover:text-red-600 transition duration-300"
                  >
                    <Trash size={26} />
                  </button>
                </div>
              </div>
            );
          })}

          {/* 💎 View Cart Details */}
          <div className="flex justify-between items-center mt-8 border-t border-gray-300 pt-6">
            <h3 className="text-3xl font-bold text-[#A67B5B]">
              💰 Total: ₹{totalPrice.toLocaleString()}
            </h3>
            <button
              onClick={() => navigate("/cart-detail")}
              className="px-6 py-3 bg-gradient-to-r from-[#A67B5B] to-[#8B5E3B] text-white rounded-lg hover:scale-105 transition transform duration-300 text-lg font-semibold shadow-lg"
            >
              📄 View Cart Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

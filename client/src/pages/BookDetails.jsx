import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  X, ShoppingCart, Heart, MessageCircle, CreditCard, Star, ZoomIn
} from "lucide-react"; // Icons for UI improvements
import { useCart } from "../context/CartContext";

const BookDetails = () => {
  const API_BASE_URL = `${import.meta.env.VITE_SERVER}`;
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Move inside the component

  // 📌 State for book and wishlist
  const [book, setBook] = useState(null);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);
  const [showZoom, setShowZoom] = useState(false);

  // 📌 Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBook();
  }, [id]);

  // ✅ Add to Wishlist (Avoid Duplicates)
  const addToWishlist = () => {
    if (!book) return;

    const isAlreadyInWishlist = wishlist.some((item) => item._id === book._id);
    if (isAlreadyInWishlist) {
      alert("This book is already in your wishlist! ❤️");
      return;
    }

    const updatedWishlist = [...wishlist, book];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    alert("Book added to wishlist! ❤️");
  };

  if (!book)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg font-semibold text-gray-600 dark:text-white animate-pulse">
          Loading book details...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex justify-center items-center p-6 md:p-12 relative">
      
      {/* 🔴 Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition duration-300"
      >
        <X size={24} />
      </button>

      <div className="max-w-6xl w-full bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* 📌 Book Image Section */}
        <div className="md:w-1/2 flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-700 relative">
          <img
            src={book.image || "/default-book.jpg"}
            alt={book.title}
            className="w-full max-h-[500px] object-contain rounded-lg shadow-md hover:scale-105 cursor-pointer transition duration-300"
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
          />
          {showZoom && (
            <div className="absolute top-4 right-4 bg-gray-900 text-white p-2 rounded-full">
              <ZoomIn size={20} />
            </div>
          )}
        </div>

        {/* 📌 Book Details Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">{book.title}</h2>
            <p className="text-lg text-gray-500 dark:text-gray-300 mb-2">
              By <span className="font-semibold text-gray-700 dark:text-white">{book.author}</span>
            </p>
            <p className="text-3xl font-semibold text-green-600 mb-4">₹{book.price}</p>

            <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg max-h-32 overflow-y-auto p-2 border border-gray-300 dark:border-gray-600 rounded-lg">
              {book.description || "No description available for this book."}
            </div>

            {/* ⭐ Rating & Reviews */}
            <div className="flex items-center mt-4">
              <Star size={20} className="text-yellow-400" />
              <Star size={20} className="text-yellow-400" />
              <Star size={20} className="text-yellow-400" />
              <Star size={20} className="text-yellow-400" />
              <Star size={20} className="text-gray-300" />
              <p className="ml-2 text-gray-600 dark:text-gray-300">(4.0/5) 120 Reviews</p>
            </div>
          </div>

          {/* 📌 Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => addToCart(book)}
              className="flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
              <CreditCard size={20} /> Buy Now
            </button>
            <button
              onClick={addToWishlist}
              className="flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              <Heart size={20} /> Add to Wishlist
            </button>
            <button className="flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300">
              <MessageCircle size={20} /> Contact Seller
            </button>
          </div>

          {/* 📌 Seller Info */}
         
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? book.category === category : true)
  );

  return (
    <>
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#F8F9FA] to-[#ECEFF1] text-[#2C3E50]">
      {/* 🔍 Search & Category  */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-white rounded-xl shadow-lg">
        <input
          type="text"
          placeholder="Search for books..."
          className="w-full md:w-2/3 p-4 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-[#A67B5B] transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border-2 p-3 rounded-lg bg-[#FFFFFF] text-[#3A3A3A] border-[#D1CFCF] focus:outline-none focus:ring-2 focus:ring-[#A67B5B] mt-4 md:mt-0"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">📖 All Categories</option>
          <option value="Science">🔬 Science</option>
          <option value="Fiction">📚 Fiction</option>
          <option value="History">🏛 History</option>
          <option value="Technology">💻 Technology</option>
        </select>
      </div>

      {/* 📚 Books Grid */}
      {loading ? (
        // ✅ Skeleton UI while loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white shadow-xl border border-gray-200 flex flex-col items-center text-center animate-pulse"
            >
              <div className="w-40 h-56 bg-gray-300 rounded-lg mb-4"></div>
              <div className="w-32 h-5 bg-gray-300 rounded mb-2"></div>
              <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-16 h-6 bg-gray-300 rounded mb-2"></div>
              <div className="w-full h-10 bg-gray-300 rounded mt-auto"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="relative p-6 rounded-xl bg-white shadow-xl border border-gray-200 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl flex flex-col items-center text-center bg-opacity-90 backdrop-blur-lg overflow-hidden"
            >
              {/* 📖 Book Image */}
              <img
                src={book.image || "/default-book.jpg"}
                alt={book.title}
                className="w-40 h-56 object-cover rounded-lg shadow-md mb-4 transition-all duration-500 hover:scale-105"
              />

              {/* 📌 Book Title */}
              <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                {book.title}
              </h2>

              {/* ✍️ Author */}
              <p className="text-gray-600 text-sm italic">{book.author}</p>

              {/* 💰 Price */}
              <p className="text-green-600 font-bold text-lg mt-2">₹{book.price}</p>

              {/* ✨ Floating Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-30 pointer-events-none"></div>

              {/* 🔗 View Details Button */}
              <button
                onClick={() => navigate(`/book/${book._id}`)}
                className="mt-auto w-full px-4 py-2 rounded-lg font-semibold bg-[#A67B5B] text-white hover:bg-[#8B5E3B] transition-all shadow-md"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
       
    </div>
     <Footer />
     </>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchListings = async () => {
      if (!token || !userId) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/books/listings?userId=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setListings(res.data);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [token, userId]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#F8F9FA] to-[#ECEFF1] text-[#2C3E50]">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Listings</h2>

      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* ➕ Add a Book Card */}
          <Link
            to="/add-book"
            className="relative p-6 rounded-xl bg-white shadow-xl border border-gray-200 flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
          >
            <div className="w-20 h-20 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full shadow-md">
              <span className="text-5xl font-bold">+</span>
            </div>
            <p className="mt-4 text-lg font-semibold text-blue-500">
              Add a New Book
            </p>
          </Link>

          {/* 📚 User's Listed Books */}
          {listings.length === 0 ? (
            <div className="col-span-full flex flex-col items-center text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
                alt="No Books Found"
                className="w-48 mb-4 opacity-70"
              />
              <p className="text-lg text-gray-600 mb-4">No books listed yet.</p>
              <Link
                to="/add-book"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                + Add a Book
              </Link>
            </div>
          ) : (
            listings.map((listing) => (
              <div
                key={listing._id}
                className="relative p-6 rounded-xl bg-white shadow-xl border border-gray-200 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl flex flex-col items-center text-center bg-opacity-90 backdrop-blur-lg overflow-hidden"
              >
                {/* 📖 Book Image */}
                <img
                  src={listing.image || "/default-book.jpg"}
                  alt={listing.title}
                  className="w-40 h-56 object-cover rounded-lg shadow-md mb-4 transition-all duration-500 hover:scale-105"
                />

                {/* 📌 Book Title */}
                <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                  {listing.title}
                </h2>

                {/* ✍️ Author */}
                <p className="text-gray-600 text-sm italic">{listing.author}</p>

                {/* 💰 Price */}
                <p className="text-green-600 font-bold text-lg mt-2">
                  ₹{listing.price}
                </p>

                {/* ✨ Floating Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-30 pointer-events-none"></div>

                {/* 🗑 Delete Button */}
                <button
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `http://localhost:5000/api/books/${listing._id}`,
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      );
                      setListings(listings.filter((b) => b._id !== listing._id));
                    } catch (err) {
                      console.error("Error deleting book:", err);
                    }
                  }}
                  className="mt-auto w-full px-4 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyListings;

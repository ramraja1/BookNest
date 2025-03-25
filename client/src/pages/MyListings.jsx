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
    <div className="min-h-screen p-8 bg-[#F7F7F7] text-[#3A3A3A]">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Listings</h2>

      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : listings.length === 0 ? (
        <div className="flex flex-col items-center text-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="p-6 rounded-xl shadow-lg border border-[#D1CFCF] bg-[#FFFFFF] transform transition hover:-translate-y-2 hover:shadow-2xl flex flex-col"
            >
              {/* 📖 Book Image */}
              <img
                src={listing.image || "/default-book.jpg"}
                alt={listing.title}
                className="w-full h-56 object-contain mb-4 rounded-lg shadow-md bg-white"
              />

              {/* 📌 Book Title */}
              <h2 className="text-xl font-bold text-[#3A3A3A] h-12 overflow-hidden line-clamp-2">
                {listing.title}
              </h2>

              {/* ✍️ Author */}
              <p className="text-[#A67B5B] h-6 overflow-hidden line-clamp-1">
                {listing.author}
              </p>

              {/* 💰 Price */}
              <p className="text-green-600 font-semibold text-lg mt-2">
                ₹{listing.price}
              </p>

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
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;

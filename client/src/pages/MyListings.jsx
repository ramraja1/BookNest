import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userId = user?.id;
  const API_BASE_URL = `${import.meta.env.VITE_SERVER}`;
  useEffect(() => {
    const fetchListings = async () => {
      if (!token || !userId) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
         `${API_BASE_URL}/api/books/listings?userId=${userId}`,
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/books/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListings(listings.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-800">
      <h2 className="text-3xl font-bold mb-6">📚 My Listings</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* ➕ Add a Book Card */}
          <Link
            to="/add-book"
            className="relative flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-md border border-gray-300 transition-all hover:shadow-lg"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
              <span className="text-4xl font-bold">+</span>
            </div>
            <p className="mt-3 text-lg font-medium text-gray-700">Add a New Book</p>
          </Link>

          {/* 📚 User's Listed Books */}
          {listings.length === 0 ? (
            <div className="col-span-full flex flex-col items-center text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
                alt="No Books Found"
                className="w-40 mb-4 opacity-70"
              />
              <p className="text-lg text-gray-600 mb-4">No books listed yet.</p>
              <Link
                to="/add-book"
                className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                + Add a Book
              </Link>
            </div>
          ) : (
            listings.map((listing) => (
              <div
                key={listing._id}
                className="relative flex flex-col items-center text-center p-5 bg-white shadow-md border border-gray-300 rounded-xl transition-all hover:shadow-lg"
              >
                {/* 📖 Book Image */}
                <img
                  src={listing.image || "/default-book.jpg"}
                  alt={listing.title}
                  className="w-40 h-56 object-cover rounded-lg shadow mb-3 transition-all duration-500 hover:scale-105"
                />

                {/* 📌 Book Title */}
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {listing.title}
                </h2>

                {/* ✍️ Author */}
                <p className="text-gray-600 text-sm">{listing.author}</p>

                {/* 💰 Price */}
                <p className="text-gray-700 font-medium mt-1">₹{listing.price}</p>

                {/* ✏️ Edit Button (Right Side) */}
                <Link
                  to={`/editBook/${listing._id}`}
                  className="absolute top-3 right-3 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition"
                >
                  ✏️
                </Link>

                {/* 🗑 Delete Button */}
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="mt-3 w-full px-4 py-2 rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition"
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

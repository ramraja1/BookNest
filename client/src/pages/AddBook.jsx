import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";

const AddBook = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle image upload with preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Uploading image...");
      const formDataImage = new FormData();
      formDataImage.append("image", formData.image);
    
      const uploadRes = await axios.post(
        "http://localhost:5000/api/books/upload-image",
        formDataImage,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Image uploaded:", uploadRes.data);
    
      console.log("Submitting book data...");
      const bookData = {
        title: formData.title,
        author: formData.author,
        price: formData.price,
        category: formData.category,
        description: formData.description,
        seller: user.id,
        image: uploadRes.data.imageUrl,
      };
    
      const bookRes = await axios.post("http://localhost:5000/api/books/add", bookData);
      console.log("Book added successfully:", bookRes.data);
    
      toast.success("Book added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding book:", error.response ? error.response.data : error);
      toast.error("Something went wrong! Please try again.");
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7F7F7] p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* 📌 Left Side - Book Preview */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-[#3A3A3A] mb-4 text-center">📖 Live Preview</h3>
          <div className="p-6 rounded-xl shadow-lg border border-[#D1CFCF] bg-[#FFFFFF] flex flex-col">
            <img
              src={imagePreview || "/default-book.jpg"}
              alt="Book Preview"
              className="w-full h-56 object-contain mb-4 rounded-lg shadow-md bg-white"
            />
            <h2 className="text-xl font-bold text-[#3A3A3A] h-12 overflow-hidden line-clamp-2">
              {formData.title || "Book Title"}
            </h2>
            <p className="text-[#A67B5B] h-6 overflow-hidden line-clamp-1">{formData.author || "Author Name"}</p>
            <p className="text-green-600 font-semibold text-lg mt-2">₹{formData.price || "0.00"}</p>
            <button className="mt-auto w-full px-4 py-2 rounded-lg font-semibold bg-[#A67B5B] text-[#FFFFFF]">
              View Details
            </button>
          </div>
        </div>

        {/* 📌 Right Side - Form */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-center text-[#3A3A3A] mb-6">Sell Your Book</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A67B5B]"
              onChange={handleChange}
            />
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A67B5B]"
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              required
              min="0"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A67B5B]"
              onChange={handleChange}
            />
            <select
              name="category"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A67B5B]"
              onChange={handleChange}
            >
              <option value="">📖 Select Category</option>
              <option value="Science">🔬 Science</option>
              <option value="Fiction">📚 Fiction</option>
              <option value="History">🏛 History</option>
              <option value="Technology">💻 Technology</option>
            </select>
            <textarea
              name="description"
              placeholder="Enter book description..."
              required
              rows="4"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A67B5B]"
              onChange={handleChange}
            ></textarea>

            {/* 📸 Image Upload */}
            <label className="w-full flex items-center justify-center border-2 border-dashed border-[#D1CFCF] p-5 rounded-lg cursor-pointer">
              <input
                type="file"
                accept="image/*"
                required
                className="hidden"
                onChange={handleImageChange}
              />
              <FaUpload className="text-[#A67B5B] text-3xl" />
              <span className="ml-2 text-[#3A3A3A]">Upload Book Image</span>
            </label>

            {/* 🚀 Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3 rounded-lg transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#A67B5B] hover:bg-[#8B5E3B]"
              }`}
            >
              {loading ? "Uploading..." : "Add Book"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

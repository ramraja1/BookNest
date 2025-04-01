import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import BookIcon from "../pages/BookIcon"; // ✅ Import SVG Component

const EditBook = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    description: "",
    image: null, // ✅ Default is null (No new image initially)
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        const book = response.data;
        setFormData({
          title: book.title,
          author: book.author,
          price: book.price,
          category: book.category,
          description: book.description,
          image: book.image, // ✅ Keep old image if not updated
        });
        setImagePreview(book.image); // ✅ Set preview to existing image
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast.error("Failed to load book details.");
      }
    };

    fetchBook();
  }, [id]);

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

  // ✅ Handle form submission (Updating Book)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let imageUrl = formData.image;
      
      // If a new image is uploaded, upload it
      if (formData.image instanceof File) {
        console.log("Uploading new image...");
        const formDataImage = new FormData();
        formDataImage.append("image", formData.image);
        
        const uploadRes = await axios.post(
          "http://localhost:5000/api/books/upload-image",
          formDataImage,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = uploadRes.data.imageUrl; // ✅ Use new image URL
      }

      console.log("Updating book details...");
      const updatedBook = {
        title: formData.title,
        author: formData.author,
        price: formData.price,
        category: formData.category,
        description: formData.description,
        seller: user.id,
        image: imageUrl, // ✅ Updated or existing image URL
      };

      await axios.put(`http://localhost:5000/api/books/update/${id}`, updatedBook);
      
      toast.success("Book updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error.response?.data || error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7F7F7] p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        
        {/* 📌 Left Side - Book Preview */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-[#3A3A3A] mb-4 text-center">📖 Live Preview</h3>
          <div className="p-6 rounded-xl shadow-lg border border-[#D1CFCF] bg-[#FFFFFF] flex flex-col">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Book Preview"
                className="w-full h-56 object-contain mb-4 rounded-lg shadow-md bg-white"
              />
            ) : (
              <div className="flex justify-center items-center h-56 bg-gray-200 rounded-lg">
                <BookIcon size={100} color="#A67B5B" /> {/* ✅ SVG Placeholder */}
              </div>
            )}
        
            <h2 className="text-xl font-bold text-[#3A3A3A] h-12 overflow-hidden line-clamp-2 py-1">
              {formData.title || "Book Title"}
            </h2>
            <p className="text-[#A67B5B] h-6 overflow-hidden ">{formData.author || "Author Name"}</p>
            <p className="text-green-600 font-semibold text-lg mt-2">₹{formData.price || "0.00"}</p>
            <button className="mt-auto w-full px-4 py-2 rounded-lg font-semibold bg-[#A67B5B] text-[#FFFFFF]">
              View Details
            </button>
          </div>
        </div>

        {/* 📌 Right Side - Form */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-center text-[#3A3A3A] mb-6">Edit Your Book</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="title"
              value={formData.title}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A67B5B]"
              onChange={handleChange}
            />
            <input
              type="text"
              name="author"
              value={formData.author}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A67B5B]"
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              required
              min="0"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A67B5B]"
              onChange={handleChange}
            />
            <textarea
              name="description"
              value={formData.description}
              required
              rows="4"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A67B5B]"
              onChange={handleChange}
            ></textarea>

            <label className="w-full flex items-center justify-center border-2 border-dashed p-5 rounded-lg cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <FaUpload className="text-[#A67B5B] text-3xl" />
              <span className="ml-2 text-[#3A3A3A]">Upload Book Image</span>
            </label>

            <button type="submit" className="w-full text-white py-3 rounded-lg bg-[#A67B5B] hover:bg-[#8B5E3B]">
              {loading ? "Updating..." : "Update Book"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;

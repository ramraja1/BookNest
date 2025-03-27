import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toast CSS
import Logo from "../pages/logo";

const Footer = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/messages", formData);
      toast.success(response.data.message);
      setFormData({ name: "", email: "", message: "" }); // ✅ Reset form
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick pauseOnHover draggable />

      <footer className="bg-[#121212] text-white pt-12 pb-6">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* 🏛️ Brand & About */}
          <div>
            <Link to="/" className="text-3xl font-bold text-[#3A3A3A] hover:text-[#A67B5B] transition">
              <Logo />
            </Link>
            <p className="mt-4 text-gray-400">
              Your trusted global marketplace for buying and selling pre-loved books. 
              Bringing readers and sellers together, one book at a time.
            </p>
          </div>

          {/* 🔗 Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-300">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">🏡 Home</Link></li>
              <li><Link to="/books" className="text-gray-400 hover:text-white transition">📚 Browse Books</Link></li>
              <li><Link to="/add-book" className="text-gray-400 hover:text-white transition">📖 Sell a Book</Link></li>
            </ul>
          </div>

          {/* 📞 Contact & Support */}
          <div>
            <h3 className="text-xl font-semibold text-gray-300">Customer Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:ramtiwari7081@gmail.com" className="text-gray-400 hover:text-white flex items-center space-x-2">
                  <FaEnvelope /> <span>Email Support</span>
                </a>
              </li>
              <li>
                <a href="tel:+919696734338" className="text-gray-400 hover:text-white flex items-center space-x-2">
                  <FaPhoneAlt /> <span>+91 96967 34338</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/919696734338" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center space-x-2">
                  <FaWhatsapp /> <span>WhatsApp Chat</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 📩 Contact Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-300">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="mt-4">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full bg-[#1E1E1E] text-white p-3 rounded-md mb-3 border border-gray-700 focus:border-[#A67B5B] outline-none"
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full bg-[#1E1E1E] text-white p-3 rounded-md mb-3 border border-gray-700 focus:border-[#A67B5B] outline-none"
              />
              <textarea 
                name="message" 
                placeholder="Your Message" 
                value={formData.message} 
                onChange={handleChange} 
                className="w-full bg-[#1E1E1E] text-white p-3 rounded-md mb-3 border border-gray-700 focus:border-[#A67B5B] outline-none"
              />
              <button 
                type="submit" 
                className="w-full bg-[#A67B5B] text-white py-2 rounded-md hover:bg-[#8B5E3B] transition"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* 🌍 Social Media & Legal */}
        <div className="border-t border-gray-600 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center px-6">
          
          {/* 🔗 Social Media */}
          <div className="flex space-x-6">
            <a href="https://github.com/ramraja1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/pawan-tiwari-922284246" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* 📜 Legal Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
          </div>

          {/* ⚖️ Copyright */}
          <p className="text-gray-500 text-sm mt-4 md:mt-0">&copy; {new Date().getFullYear()} BookNest. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

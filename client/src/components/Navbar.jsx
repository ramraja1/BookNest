import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes, FaShoppingCart, FaBell } from "react-icons/fa"; // Import icons
import Logo from "../pages/logo";
import { useCart } from "../context/CartContext";
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Example cart count
  const [notifications, setNotifications] = useState(2); // Example notification count
  const [notifOpen, setNotifOpen] = useState(false); // Notification dropdown
const { cart } = useCart(); 
  const handleLogout = () => {
    logout(null);
    navigate("/login");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown-menu") && !e.target.closest(".profile-btn")) {
        setDropdownOpen(false);
      }
      if (!e.target.closest(".notif-menu") && !e.target.closest(".notif-btn")) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="bg-[#EDEDED] text-[#3A3A3A] shadow-md px-6 py-4 flex justify-between items-center border-b border-[#D1CFCF]">
      
      {/* Left: Logo */}
      <Link to="/" className="text-3xl font-bold text-[#3A3A3A] hover:text-[#A67B5B] hover:text-3xl transition">
        <Logo />
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links + Cart + Notifications */}
      <div className={`md:flex gap-8 items-center ${menuOpen ? "flex flex-col absolute top-16 left-0 w-full bg-[#EDEDED] p-4 shadow-lg" : "hidden md:flex"}`}>
        
        {/* Navigation Links */}
        <Link to="/" className="hover:text-[#A67B5B] transition">Home</Link>
        <Link to="/books" className="hover:text-[#A67B5B] transition">Browse Books</Link>
        {user && <Link to="/add-book" className="hover:text-[#A67B5B] transition">Sell a Book</Link>}

        {/* 🛒 Cart Icon */}
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-2xl hover:text-[#A67B5B] transition" />
         {cart.length > 0 && (
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
    {cart.length}
  </span>
)}

        </Link>

        {/* 🔔 Notification Icon */}
        <div className="relative notif-menu">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setNotifOpen(!notifOpen);
            }}
            className="focus:outline-none notif-btn relative"
          >
            <FaBell className="text-2xl hover:text-[#A67B5B] transition" />
            {notifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {notifications}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <p className="px-4 py-3 text-gray-800 font-semibold border-b">Notifications</p>
              {notifications > 0 ? (
                <>
                  <Link to="/notifications" className="block px-4 py-3 text-gray-800 hover:bg-gray-100">
                    📚 New book added in your category!
                  </Link>
                  <Link to="/notifications" className="block px-4 py-3 text-gray-800 hover:bg-gray-100">
                    🔥 Your book got an offer!
                  </Link>
                </>
              ) : (
                <p className="px-4 py-3 text-gray-500">No new notifications</p>
              )}
            </div>
          )}
        </div>

        {/* Auth/Profile Section */}
        <div className="relative dropdown-menu">
          {user ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className="focus:outline-none profile-btn"
            >
              <img
                src={user.image || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSI1MCIgZmlsbD0iI0M2QzZDNyIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTUwIDYwYzE1IDAgMjUgMTAgMjUgMjUgMCAxMC0xNSAxMC0yNSAwLTE1LTEwLTI1LTI1LTI1LTQtMTAtMTAtMjUgMCAyNSAxMCAwIDIwIDAgMjUtMTAtMjUgMCIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg=="}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-[#A67B5B] cursor-pointer"
              />
            </button>
          ) : (
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/login" className="bg-[#A67B5B] text-white px-4 py-2 rounded-lg hover:bg-[#8B5E3B] transition">
                Login
              </Link>
              <Link to="/signup" className="border border-[#A67B5B] px-4 py-2 rounded-lg hover:bg-[#A67B5B] hover:text-white transition">
                Signup
              </Link>
            </div>
          )}

          {/* Profile Dropdown */}
          {dropdownOpen && user && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <Link to="/profile" className="block px-4 py-3 text-gray-800 hover:bg-gray-100">
                Profile
              </Link>
              <Link to="/my-listings" className="block px-4 py-3 text-gray-800 hover:bg-gray-100">
                My Listings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

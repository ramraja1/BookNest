import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify styles

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import AddBook from "./pages/AddBook";
import BookDetails from "./pages/BookDetails";
import MyListings from "./pages/MyListings";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";

function App() {
  return (

      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ Toast Container */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
    
      </Router>

  );
}

export default App;

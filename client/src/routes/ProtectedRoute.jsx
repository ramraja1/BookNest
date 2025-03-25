import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // ✅ Ensure correct path

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log("ProtectedRoute - User:", user); // 🛠 Debugging
  return user ? children : <Navigate to="/login" />;
};


export default ProtectedRoute;

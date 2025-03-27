import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        const tokenExpiry = localStorage.getItem("tokenExpiry");

        if (storedUser && storedToken && tokenExpiry) {
          const now = Date.now(); // Get current time in milliseconds
          if (now < parseInt(tokenExpiry, 10)) {
            setUser(JSON.parse(storedUser)); // ✅ Set user only if token is valid
            console.log("%c🔥 Billionaire Logged In:", "color: gold; font-weight: bold;", JSON.parse(storedUser));
          } else {
            console.log("%c⏳ Token Expired, Logging Out...", "color: red; font-weight: bold;");
            logout();
          }
        }
      } catch (error) {
        console.error("❌ Error parsing user data:", error);
        handleLogout();
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    const tokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days from now

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    localStorage.setItem("tokenExpiry", tokenExpiry.toString());

    console.log("%c🚀 User Logged In:", "color: green; font-weight: bold;", userData);
  };

  const logout = () => {
    console.log("%c🔹 Logging Out...", "color: red; font-weight: bold;");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
  };

  // 🔥 Memoized context value to prevent unnecessary re-renders
  const authValue = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

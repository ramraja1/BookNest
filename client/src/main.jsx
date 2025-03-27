import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // ✅ Ensure Tailwind is imported
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider> {/* ✅ Ensure this wraps everything */}
   
    <CartProvider>
  <App />
</CartProvider>
  </AuthProvider>
);

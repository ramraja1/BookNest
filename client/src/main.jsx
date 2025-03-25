import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // ✅ Ensure Tailwind is imported
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider> {/* ✅ Ensure this wraps everything */}
    <App />
  </AuthProvider>
);

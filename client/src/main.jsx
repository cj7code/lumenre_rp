/**
 * ==========================================================
 * main.jsx
 * ----------------------------------------------------------
 * Application entry point.
 * ==========================================================
 */


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { StudentAuthProvider } from "./context/StudentAuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StudentAuthProvider>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </StudentAuthProvider>
  </StrictMode>
);
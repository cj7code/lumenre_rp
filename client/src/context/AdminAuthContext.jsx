/**
 * ==========================================================
 * context/AdminAuthContext.jsx
 * ----------------------------------------------------------
 * Stores administrator authentication state.
 * ==========================================================
 */

import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {

  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || null
  );

  const loginAdmin = (adminData, token) => {

    setAdmin(adminData);
    setAdminToken(token);

    localStorage.setItem(
      "admin",
      JSON.stringify(adminData)
    );

    localStorage.setItem(
      "adminToken",
      token
    );

  };

  const logoutAdmin = () => {

    setAdmin(null);
    setAdminToken(null);

    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");

  };

  return (

    <AdminAuthContext.Provider
      value={{
        admin,
        adminToken,
        loginAdmin,
        logoutAdmin
      }}
    >

      {children}

    </AdminAuthContext.Provider>

  );

};
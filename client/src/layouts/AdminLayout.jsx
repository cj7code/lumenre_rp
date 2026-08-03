/**
 * ==========================================================
 * File: layouts/AdminLayout.jsx
 * ----------------------------------------------------------
 * Shared administrator layout
 *
 * Features
 * - Responsive sidebar
 * - Mobile menu
 * - Sticky header
 * - Tailwind CSS
 * ==========================================================
 */

import { useState, useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { AdminAuthContext } from "../context/AdminAuthContext";

const links = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Upload Results", path: "/admin/upload" },
  { name: "Result Slips", path: "/admin/results" },
  { name: "Students", path: "/admin/students" },
  { name: "Payments", path: "/admin/payments" }
];

const AdminLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { logoutAdmin } = useContext(AdminAuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {

    logoutAdmin();
    navigate("/");

  };

  return (

    <div className="min-h-screen bg-slate-100">

      {/* ================= Header ================= */}

      <header className="sticky top-0 z-50 flex items-center justify-between bg-slate-900 px-6 py-4 text-white shadow">

        <h1 className="text-xl font-bold">
          Lumenre Results Portal
        </h1>

        <button
          className="text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

      </header>

      <div className="flex">

        {/* ================= Sidebar ================= */}

        <aside
          className={`
            fixed md:static
            top-16 left-0
            h-[calc(100vh-64px)]
            w-64
            bg-white
            shadow-lg
            transition-transform
            duration-300
            z-40
            ${menuOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >

          <nav className="p-5 space-y-2">

            {links.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`
                  block rounded-lg px-4 py-3 font-medium transition
                  ${
                    location.pathname === link.path
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }
                `}
              >
                {link.name}
              </Link>

            ))}

            <button
              onClick={handleLogout}
              className="mt-8 w-full rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
            >
              Logout
            </button>

          </nav>

        </aside>

        {/* ================= Content ================= */}

        <main className="flex-1 p-4 md:ml-64 md:p-8">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default AdminLayout;
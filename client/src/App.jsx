/**
 * ==========================================================
 * File: App.jsx
 * ----------------------------------------------------------
 * Main application routing configuration.
 *
 * Handles:
 * - Student authentication routes
 * - Student dashboard
 * - Admin authentication routes
 * - Admin protected pages
 * ==========================================================
 */


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import AdminLayout from "./layouts/AdminLayout";

import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Students from "./pages/Students";
import UploadResultSlip from "./pages/UploadResultSlip";
import ResultSlips from "./pages/ResultSlips";
import Payments from "./pages/Payments";



function App(){

  return (

    <BrowserRouter>

      <Routes>
        {/* ==================================================
            Student Routes
        ================================================== */}
        <Route
          path="/"
          element={<StudentLogin />}
        />

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        {/* ==================================================
            Admin Login
        ================================================== */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        {/* ==================================================
            Admin Dashboard Layout
        ================================================== */}
        <Route
          element={<AdminLayout />}
        >

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/upload"
            element={<UploadResultSlip />}
          />

          <Route
            path="/admin/students"
            element={<Students />}
          />

          <Route
            path="/admin/payments"
            element={<Payments />}
          />

          <Route
            path="/admin/results"
            element={<ResultSlips />}
          />

        </Route>
      </Routes>
    </BrowserRouter>

  );

}


export default App;
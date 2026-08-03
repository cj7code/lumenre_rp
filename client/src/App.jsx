/**
 * ==========================================================
 * App.jsx
 * ----------------------------------------------------------
 * Main application routing configuration.
 * ==========================================================
 */

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AuditLogs from "./pages/AuditLogs";
import UploadResultSlip from "./pages/UploadResultSlip";
import AdminResults from "./pages/AdminResults";
import ResultSlips from "./pages/ResultSlips";
import Students from "./pages/Students";
import Payments from "./pages/Payments";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/student/login"
          element={<StudentLogin />}
        />

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Admin */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/audit"
            element={<AuditLogs />}
          />

          <Route
            path="upload"
            element={<UploadResultSlip />}
          />

          <Route
            path="results"
            element={<AdminResults />}
          />

          <Route
            path="students"
            element={<Students />}
          />

          <Route
            path="payments"
            element={<Payments />}
          />

          <Route
            path="result-slips"
            element={<ResultSlips />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;
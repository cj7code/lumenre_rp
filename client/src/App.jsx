/**
 * ==========================================================
 * App.jsx
 * ----------------------------------------------------------
 * Main application routes.
 * ==========================================================
 */


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import Students from "./pages/Students";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UploadResultSlip from "./pages/UploadResultSlip";
import ResultSlips from "./pages/ResultSlips";

function App(){

return (

<BrowserRouter>
  <Routes>
    <Route
    path="/"
    element={<StudentLogin />}
    />
    
    <Route
    path="/student/dashboard"
    element={<StudentDashboard />}
    />

    <Route
    path="/admin"
    element={<AdminLogin />}
    />

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
      path="/admin/results"
      element={<ResultSlips />}
      />
    </Route>
  </Routes>
</BrowserRouter>

);

}


export default App;
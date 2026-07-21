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

import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UploadResultSlip from "./pages/UploadResultSlip";

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
    path="/admin/dashboard"
    element={<AdminDashboard />}
    />

    <Route
    path="/admin/upload"
    element={<UploadResultSlip />}
    />
  </Routes>
</BrowserRouter>

);

}


export default App;
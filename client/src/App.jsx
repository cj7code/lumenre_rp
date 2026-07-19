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
  </Routes>
</BrowserRouter>

);

}


export default App;
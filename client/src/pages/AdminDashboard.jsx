/**
 * ==========================================================
 * pages/AdminDashboard.jsx
 * ----------------------------------------------------------
 * Main administrator dashboard.
 * ==========================================================
 */

import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";

const AdminDashboard = () => {

  const { admin } = useContext(AdminAuthContext);

  return (

    <div className="container mt-4">

      <h2>
        Welcome {admin?.fullName || "Administrator"}
      </h2>

      <hr />

      <div className="row">

            <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                <h5>Total Students</h5>
                <h2>0</h2>
                </div>
            </div>
            </div>
            
            <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                <h5>Uploaded Result Slips</h5>
                <h2>0</h2>
                </div>
            </div>
            </div>

            <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                <h5>Released Results</h5>
                <h2>0</h2>
                </div>
            </div>
            </div>

      </div>

      <div className="mt-5">
        <h4>Recent Uploads</h4>
        <p>No uploads yet.</p>
      </div>

    </div>

  );

};

export default AdminDashboard;
/**
 * ==========================================================
 * pages/AdminDashboard.jsx
 * ----------------------------------------------------------
 * Administrator Dashboard
 * Displays system statistics and quick overview.
 * ==========================================================
 */

import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AdminAuthContext } from "../context/AdminAuthContext";

const AdminDashboard = () => {

  const { admin, adminToken } = useContext(AdminAuthContext);

  const [stats, setStats] = useState({
    totalStudents: 0,
    uploadedResults: 0,
    releasedResults: 0,
    pendingResults: 0
  });

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {

      const response = await API.get(
        "/result-slips/dashboard",
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );

      setStats(response.data.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="container-fluid">

      <h2 className="mb-3">
        Welcome {admin?.fullName || "Administrator"}
      </h2>

      <hr />

      <div className="row g-3">

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Total Students</h6>
              <h2>{stats.totalStudents}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Uploaded Results</h6>
              <h2>{stats.uploadedResults}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Released Results</h6>
              <h2>{stats.releasedResults}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Pending Results</h6>
              <h2>{stats.pendingResults}</h2>
            </div>
          </div>
        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;
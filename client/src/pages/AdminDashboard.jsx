/**
 * ==========================================================
 * pages/AdminDashboard.jsx
 * ----------------------------------------------------------
 * Lumenre Results Portal
 *
 * Administrator Overview Dashboard
 *
 * Responsibilities:
 * - Display system summary statistics
 * - Display recent result activity
 * - Provide navigation to management pages
 *
 * Note:
 * Result release/lock actions are handled in:
 * pages/AdminResults.jsx
 * ==========================================================
 */

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { AdminAuthContext } from "../context/AdminAuthContext";

const AdminDashboard = () => {

  const { admin, adminToken } = useContext(AdminAuthContext);

  // Dashboard statistics
  const [stats, setStats] = useState({
    totalStudents: 0,
    uploadedResults: 0,
    releasedResults: 0,
    pendingResults: 0
  });

  // Recent uploads
  const [recentUploads, setRecentUploads] = useState([]);

  /**
   * Load dashboard information
   */
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      };

      const [
        statsResponse,
        uploadsResponse
      ] = await Promise.all([
        API.get("/result-slips/dashboard", config),
        API.get("/result-slips/recent", config)
      ]);

      setStats(statsResponse.data.data);
      setRecentUploads(uploadsResponse.data.data);

    } catch (error) {

      console.error("Dashboard loading error:", error);

    }

  };

  return (

    <div className="container-fluid">

      {/* ======================================================
          Header
      ====================================================== */}

      <div className="mb-4">

        <h2>
          Welcome, {admin?.fullName || "Administrator"}
        </h2>

        <p className="text-muted mb-0">
          Lumenre Results Portal Administration
        </p>

      </div>

      {/* ======================================================
          Dashboard Statistics
      ====================================================== */}

      <div className="row g-3 mb-4">

        <SummaryCard
          title="Total Students"
          value={stats.totalStudents}
        />

        <SummaryCard
          title="Uploaded Results"
          value={stats.uploadedResults}
        />

        <SummaryCard
          title="Released Results"
          value={stats.releasedResults}
          color="text-success"
        />

        <SummaryCard
          title="Locked Results"
          value={stats.pendingResults}
          color="text-warning"
        />

      </div>

      {/* ======================================================
          Management Shortcuts
      ====================================================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-header">

          <h5 className="mb-0">
            Management
          </h5>

        </div>

        <div className="card-body d-flex flex-wrap gap-3">

          <Link
            to="/admin/upload"
            className="btn btn-primary"
          >
            Upload Results
          </Link>

          <Link
            to="/admin/results"
            className="btn btn-success"
          >
            Manage Results
          </Link>

          <Link
            to="/admin/students"
            className="btn btn-secondary"
          >
            Students
          </Link>

        </div>

      </div>

      {/* ======================================================
          Recent Activity
      ====================================================== */}

      <div className="card shadow-sm">

        <div className="card-header">

          <h5 className="mb-0">
            Recent Result Activity
          </h5>

        </div>

        <div className="table-responsive">

          <table className="table table-hover mb-0">

            <thead className="table-light">

              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>Academic Year</th>
                <th>Year</th>
                <th>Semester</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {
                recentUploads.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-4"
                    >
                      No recent uploads found.
                    </td>

                  </tr>

                ) : (

                  recentUploads.map((result) => (

                    <tr key={result._id}>

                      <td>{result.student?.fullName}</td>

                      <td>{result.student?.studentId}</td>

                      <td>{result.academicYear}</td>

                      <td>{result.year}</td>

                      <td>{result.semester}</td>

                      <td>

                        {
                          result.released ? (

                            <span className="badge bg-success">
                              Released
                            </span>

                          ) : (

                            <span className="badge bg-warning text-dark">
                              Locked
                            </span>

                          )
                        }

                      </td>

                    </tr>

                  ))

                )

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

/**
 * ==========================================================
 * Reusable Dashboard Summary Card
 * ==========================================================
 */

const SummaryCard = ({
  title,
  value,
  color = ""
}) => (

  <div className="col-lg-3 col-md-6">

    <div className="card shadow-sm dashboard-card">

      <div className="card-body text-center">

        <h6 className="text-muted">
          {title}
        </h6>

        <h2 className={`stat-number ${color}`}>
          {value}
        </h2>

      </div>

    </div>

  </div>

);

export default AdminDashboard;
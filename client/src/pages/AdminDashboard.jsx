/**
 * ==========================================================
 * pages/AdminDashboard.jsx
 * ----------------------------------------------------------
 * Administrator Dashboard
 * Displays system statistics and recent uploads.
 * ==========================================================
 */

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const [recentUploads, setRecentUploads] = useState([]);

  useEffect(() => {
    loadDashboardStats();
    loadRecentUploads();
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

  const loadRecentUploads = async () => {

    try {

      const response = await API.get(
        "/result-slips/recent",
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );

      setRecentUploads(response.data.data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="mb-1">
            Welcome {admin?.fullName || "Administrator"}
          </h2>

          <p className="text-muted mb-0">
            Lumenre Results Portal Administration Dashboard
          </p>

        </div>

      </div>

      <div className="row g-3 mb-4">

        <div className="col-lg-3 col-md-6">

          <div className="card shadow-sm border-0">

            <div className="card-body text-center">

              <h6 className="text-muted">
                Total Students
              </h6>

              <h2 className="fw-bold">
                {stats.totalStudents}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card shadow-sm border-0">

            <div className="card-body text-center">

              <h6 className="text-muted">
                Uploaded Results
              </h6>

              <h2 className="fw-bold">
                {stats.uploadedResults}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card shadow-sm border-0">

            <div className="card-body text-center">

              <h6 className="text-muted">
                Released Results
              </h6>

              <h2 className="fw-bold text-success">
                {stats.releasedResults}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card shadow-sm border-0">

            <div className="card-body text-center">

              <h6 className="text-muted">
                Pending Results
              </h6>

              <h2 className="fw-bold text-warning">
                {stats.pendingResults}
              </h2>

            </div>

          </div>

        </div>

      </div>

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-header bg-white">

          <h5 className="mb-0">
            Quick Actions
          </h5>

        </div>

        <div className="card-body d-flex flex-wrap gap-3">

          <Link
            to="/admin/upload"
            className="btn btn-primary"
          >
            Upload Result Slip
          </Link>

          <Link
            to="/admin/results"
            className="btn btn-success"
          >
            Manage Result Slips
          </Link>

          <Link
            to="/admin/students"
            className="btn btn-secondary"
          >
            View Students
          </Link>

        </div>

      </div>

      <div className="card shadow-sm border-0">

        <div className="card-header bg-white d-flex justify-content-between align-items-center">

          <h5 className="mb-0">
            Recent Uploads
          </h5>

          <Link
            to="/admin/results"
            className="btn btn-sm btn-outline-primary"
          >
            View All
          </Link>

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

                recentUploads.length === 0

                ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-4"
                    >
                      No uploaded result slips found.
                    </td>

                  </tr>

                )

                : (

                  recentUploads.map((slip) => (

                    <tr key={slip._id}>

                      <td>
                        {slip.student?.fullName}
                      </td>

                      <td>
                        {slip.student?.studentId}
                      </td>

                      <td>
                        {slip.academicYear}
                      </td>

                      <td>
                        {slip.year}
                      </td>

                      <td>
                        {slip.semester}
                      </td>

                      <td>

                        {

                          slip.released

                          ? (
                            <span className="badge bg-success">
                              Released
                            </span>
                          )

                          : (
                            <span className="badge bg-warning text-dark">
                              Pending
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

export default AdminDashboard;
/**
 * ==========================================================
 * layouts/AdminLayout.jsx
 * ----------------------------------------------------------
 * Shared layout for all administrator pages.
 * ==========================================================
 */

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";

const AdminLayout = () => {

  const navigate = useNavigate();

  const { logoutAdmin } = useContext(AdminAuthContext);

  const handleLogout = () => {

    logoutAdmin();

    navigate("/");

  };

  return (

    <div>

      <nav className="navbar navbar-dark bg-primary">

        <div className="container-fluid">

          <span className="navbar-brand">

            Lumenre Results Portal

          </span>

        </div>

      </nav>

      <div className="container-fluid">

        <div className="row">

          <div className="col-md-2 bg-light min-vh-100 p-3">

            <h5>Admin Panel</h5>

            <hr />

            <ul className="nav flex-column">

              <li className="nav-item">

                <Link
                  className="nav-link"
                  to="/admin/dashboard"
                >

                  Dashboard

                </Link>

              </li>

              <li className="nav-item">

                <Link
                  className="nav-link"
                  to="/admin/upload"
                >

                  Upload Result

                </Link>

              </li>

              <li className="nav-item">

                <Link
                  className="nav-link"
                  to="/admin/results"
                >

                  Result Slips

                </Link>

              </li>

              <li className="nav-item">

                <Link
                  className="nav-link"
                  to="/admin/students"
                >

                  Students

                </Link>

              </li>

              <li className="nav-item">

                <Link
                className="nav-link"
                to="/admin/payments"
                >

                Payments

                </Link>

              </li>

              <li className="nav-item mt-4">

                <button
                  className="btn btn-danger w-100"
                  onClick={handleLogout}
                >

                  Logout

                </button>

              </li>

            </ul>

          </div>

          <div className="col-md-10 p-4">

            <Outlet />

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminLayout;
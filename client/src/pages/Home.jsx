/**
 * ==========================================================
 * pages/Home.jsx
 * ----------------------------------------------------------
 * Public landing page for Lumenre Results Portal.
 * Students log in from here.
 * Administrator login is intentionally hidden.
 * ==========================================================
 */

import { Link } from "react-router-dom";

const Home = () => {

  return (

    <div className="container">

      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >

        <div className="col-md-6">

          <div className="card shadow-lg">

            <div className="card-body p-5">

              <div className="text-center">

                <h1 className="mb-2">

                  Lumenre Results Portal

                </h1>

                <p className="text-muted">

                  Secure Student Results Management System

                </p>

              </div>

              <hr />

              <h4 className="text-center mb-4">

                Student Portal

              </h4>

              <p className="text-center">

                Access your officially released result slips.

              </p>

              <div className="d-grid">

                <Link
                  to="/student/login"
                  className="btn btn-primary btn-lg"
                >

                  Student Login

                </Link>

              </div>

              <hr />

              <div className="text-center">

                <small className="text-muted">

                  Only officially released results are available.

                </small>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Home;
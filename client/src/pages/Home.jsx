/**
 * ==========================================================
 * pages/Home.jsx
 * ----------------------------------------------------------
 * Landing page allowing users to choose login type.
 * ==========================================================
 */


import { Link } from "react-router-dom";


const Home = () => {

  return (

    <div className="container mt-5 text-center">

      <h1>
        Lumenre Results Portal
      </h1>

      <p className="mt-3">
        Select your login option
      </p>


      <div className="d-flex justify-content-center gap-3 mt-4">


        <Link
          to="/student/login"
          className="btn btn-primary"
        >
          Student Login
        </Link>


        <Link
          to="/admin"
          className="btn btn-dark"
        >
          Admin Login
        </Link>


      </div>


    </div>

  );

};


export default Home;
/**
 * ==========================================================
 * File: pages/Home.jsx
 * ----------------------------------------------------------
 * Public landing page for Lumenre Results Portal.
 * Students log in from here.
 * Administrator login is intentionally hidden.
 * ==========================================================
 */

import { Link } from "react-router-dom";


const Home = () => {

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">


        <div className="text-center">

          <h1 className="mb-2 text-3xl font-bold text-slate-800">
            Lumenre Results Portal
          </h1>


          <p className="text-slate-500">
            Secure Student Results Management System
          </p>


        </div>


        <hr className="my-6" />


        <h4 className="mb-4 text-center text-xl font-semibold text-slate-700">
          Student Portal
        </h4>


        <p className="mb-6 text-center text-slate-600">
          Access your officially released result slips.
        </p>


        <Link
          to="/student/login"
          className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
        >
          Student Login
        </Link>


        <hr className="my-6" />


        <p className="text-center text-sm text-slate-500">
          Only officially released results are available.
        </p>


      </div>

    </div>

  );

};


export default Home;
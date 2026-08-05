/**
 * ==========================================================
 * pages/AdminLogin.jsx
 * ----------------------------------------------------------
 * Administrator login page.
 *
 * Features:
 * - Secure administrator authentication
 * - Separate administrative interface
 * - Redirect to admin dashboard
 *
 * Note:
 * This page is not linked from the public student portal.
 * ==========================================================
 */


import {
  useState,
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../api/axios";

import {
  AdminAuthContext
} from "../context/AdminAuthContext";

import PortalLayout from "../components/PortalLayout";


const AdminLogin = () => {

  const [formData,setFormData] = useState({

    email:"",
    password:""

  });

  const [error,setError] = useState("");

  const navigate = useNavigate();

  const {
    loginAdmin

  } = useContext(AdminAuthContext);


  // ==========================================================
  // Handle Input
  // ==========================================================

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };


  // ==========================================================
  // Login Submit
  // ==========================================================

  const handleSubmit = async(e)=>{

    e.preventDefault();

    setError("");


    try{

      const response =

      await API.post(

        "/auth/admin/login",

        formData

      );


      loginAdmin(

        response.data.data.admin,

        response.data.data.token

      );

      navigate(
        "/admin/dashboard"
      );

    }
    catch(error){

      setError(

        error.response?.data?.message ||

        "Login failed. Please check your credentials."

      );

    }

  };


  return (

    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 to-blue-950 px-6 py-10">

      <div className="flex flex-1 items-center justify-center">

        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

          {/* Header */}

          <div className="mb-8 text-center">

            <div className="mb-3 text-5xl">
              🔐
            </div>

            <h1 className="text-3xl font-bold text-slate-800
            ">
              Administrator Portal
            </h1>

            <p className="mt-2 text-slate-500
            ">
              Authorized personnel access only.
            </p>

          </div>

          {/* Error */}

          {
            error && (

              <div className="mb-5 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">

                {error}

              </div>

            )
          }

          <form

            onSubmit={handleSubmit}

            className="space-y-5"

          >

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">

                Email Address

              </label>

             <input

                type="email"

                name="email"

                value={formData.email}

                onChange={handleChange}

                placeholder="admin@example.com"

                className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"

                required

              />

            </div>

            {/* Password */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">

                Password

              </label>

              <input

                type="password"

                name="password"

                value={formData.password}

                onChange={handleChange}

                placeholder="Enter password"

                className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
                
                required
              />

            </div>

            {/* Button */}

            <button
              type="submit"
              className="mt-3 w-full rounded-xl bg-blue-800 py-3 font-semibold text-white shadow transition hover:bg-blue-900">
              Secure Login
            </button>

          </form>

          {/* Security Notice */}

          <div className="mt-8 border-t pt-5 text-center text-sm text-slate-500
          ">

            <p>
              Administrative actions are recorded.
            </p>

            <p className="mt-2">
              Unauthorized access is prohibited.
            </p>

          </div>

        </div>

      </div>

    </div>


  );


};



export default AdminLogin;
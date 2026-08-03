/**
 * ==========================================================
 * File: pages/AdminLogin.jsx
 * ----------------------------------------------------------
 * Administrator login page.
 * ==========================================================
 */

import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import { AdminAuthContext } from "../context/AdminAuthContext";


const AdminLogin = () => {

  const [formData,setFormData] = useState({
    email:"",
    password:""
  });

  const [error,setError] = useState("");

  const navigate = useNavigate();

  const { loginAdmin } = useContext(AdminAuthContext);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  };


  const handleSubmit = async(e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/admin/login",
        formData
      );

      loginAdmin(
        response.data.data.admin,
        response.data.data.token
      );

      navigate("/admin/dashboard");

    } catch(error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Admin Login
        </h2>


        {error && (

          <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">

            {error}

          </div>

        )}


        <form onSubmit={handleSubmit} className="space-y-4">


          <div>

            <label className="block mb-1 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>


          <div>

            <label className="block mb-1 text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>


          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            Login
          </button>


        </form>

      </div>

    </div>

  );

};


export default AdminLogin;
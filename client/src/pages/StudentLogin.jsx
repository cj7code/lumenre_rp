/**
 * ==========================================================
 * File: pages/StudentLogin.jsx
 * ----------------------------------------------------------
 * Student login page.
 * ==========================================================
 */

import { useState,useContext } from "react";
import { useNavigate,Link } from "react-router-dom";

import API from "../api/axios";
import { StudentAuthContext } from "../context/StudentAuthContext";


const StudentLogin = () => {

  const [formData,setFormData] = useState({
    fullName:"",
    studentId:""
  });

  const [error,setError] = useState("");

  const navigate = useNavigate();

  const { loginStudent } = useContext(StudentAuthContext);


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
        "/auth/student/login",
        formData
      );


      loginStudent(
        response.data.data.student,
        response.data.data.token
      );


      navigate("/student/dashboard");


    } catch(error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">


        <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
          Student Login
        </h2>


        {error && (

          <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">

            {error}

          </div>

        )}


        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >


          <div>

            <label className="mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>


          <div>

            <label className="mb-1 block text-sm font-medium text-slate-700">
              Student ID
            </label>

            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>


          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>


        </form>


        <div className="mt-6 text-center">

          <small className="text-slate-500">

            Staff member?

            {" "}

            <Link
              to="/admin/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Admin Login
            </Link>

          </small>

        </div>


      </div>

    </div>

  );

};


export default StudentLogin;
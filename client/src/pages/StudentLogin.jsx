/**
 * ==========================================================
 * pages/StudentLogin.jsx
 * ----------------------------------------------------------
 * Student login page.
 *
 * Features:
 * - Student authentication
 * - Secure portal access
 * - Redirect to student dashboard
 *
 * ==========================================================
 */


import {
  useState,
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";


import PortalLayout from "../components/PortalLayout";

import API from "../api/axios";


import {
  StudentAuthContext
} from "../context/StudentAuthContext";



const StudentLogin = () => {


  const [formData,setFormData] = useState({

    fullName:"",
    studentId:""

  });


  const [error,setError] = useState("");


  const navigate = useNavigate();


  const {
    loginStudent

  } = useContext(StudentAuthContext);




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

        "/auth/student/login",

        formData

      );


      loginStudent(

        response.data.data.student,

        response.data.data.token

      );


      navigate(
        "/student/dashboard"
      );


    }
    catch(error){


      setError(

        error.response?.data?.message ||

        "Login failed. Please check your details."

      );

    }

  };




  return (

    <PortalLayout>


      <div className="
        flex
        flex-1
        items-center
        justify-center
      ">


        <div className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-8
          shadow-2xl
        ">


          {/* Header */}

          <div className="
            mb-8
            text-center
          ">


            <div className="
              mb-3
              text-5xl
            ">

              🎓

            </div>


            <h1 className="
              text-3xl
              font-bold
              text-slate-800
            ">

              Student Portal

            </h1>


            <p className="
              mt-2
              text-slate-500
            ">

              Sign in to access your examination results.

            </p>


          </div>




          {/* Error */}

          {
            error && (

              <div className="
                mb-5
                rounded-xl
                bg-red-100
                px-4
                py-3
                text-sm
                text-red-700
              ">

                {error}

              </div>

            )
          }





          {/* Login Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >



            {/* Full Name */}

            <div>


              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              ">

                Full Name

              </label>


              <input

                type="text"

                name="fullName"

                value={formData.fullName}

                onChange={handleChange}

                placeholder="Enter your full name"

                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  outline-none
                  transition
                  focus:border-blue-600
                  focus:ring-2
                  focus:ring-blue-200
                "

                required

              />


            </div>





            {/* Student ID */}

            <div>


              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              ">

                Student ID

              </label>


              <input

                type="text"

                name="studentId"

                value={formData.studentId}

                onChange={handleChange}

                placeholder="Enter your student ID"

                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  outline-none
                  transition
                  focus:border-blue-600
                  focus:ring-2
                  focus:ring-blue-200
                "

                required

              />


            </div>





            {/* Button */}

            <button

              type="submit"

              className="
                mt-3
                w-full
                rounded-xl
                bg-blue-800
                py-3
                font-semibold
                text-white
                shadow
                transition
                hover:bg-blue-900
              "

            >

              Secure Login

            </button>


          </form>





          {/* Notice */}

          <div className="
            mt-8
            border-t
            pt-5
            text-center
            text-sm
            text-slate-500
          ">


            <p>

              Contact Admin if you experience login problems.

            </p>


          </div>



        </div>


      </div>


    </PortalLayout>

  );

};



export default StudentLogin;
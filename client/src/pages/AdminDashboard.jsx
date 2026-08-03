/**
 * ==========================================================
 * File: pages/AdminDashboard.jsx
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
 * ==========================================================
 */

import { useContext,useEffect,useState } from "react";
import { Link } from "react-router-dom";

import API from "../api/axios";
import { AdminAuthContext } from "../context/AdminAuthContext";


const AdminDashboard = () => {

  const { admin,adminToken } = useContext(AdminAuthContext);


  const [stats,setStats] = useState({
    totalStudents:0,
    uploadedResults:0,
    releasedResults:0,
    pendingResults:0
  });


  const [recentUploads,setRecentUploads] = useState([]);



  useEffect(()=>{

    loadDashboard();

  },[]);



  const loadDashboard = async()=>{

    try{

      const config = {
        headers:{
          Authorization:`Bearer ${adminToken}`
        }
      };


      const [
        statsResponse,
        uploadsResponse
      ] = await Promise.all([

        API.get(
          "/result-slips/dashboard",
          config
        ),

        API.get(
          "/result-slips/recent",
          config
        )

      ]);


      setStats(statsResponse.data.data);

      setRecentUploads(
        uploadsResponse.data.data
      );


    }catch(error){

      console.error(
        "Dashboard loading error:",
        error
      );

    }

  };



  return (

    <div className="space-y-6">


      {/* Header */}

      <div>

        <h2 className="text-3xl font-bold text-slate-800">

          Welcome, {admin?.fullName || "Administrator"}

        </h2>


        <p className="text-slate-500">

          Lumenre Results Portal Administration

        </p>

      </div>





      {/* Statistics Cards */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">


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
          color="text-green-600"
        />


        <SummaryCard
          title="Locked Results"
          value={stats.pendingResults}
          color="text-yellow-600"
        />


      </div>





      {/* Management Links */}

      <div className="rounded-xl bg-white p-6 shadow">


        <h5 className="mb-4 text-lg font-semibold text-slate-800">

          Management

        </h5>


        <div className="flex flex-wrap gap-3">


          <Link
            to="/admin/upload"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Upload Results
          </Link>



          <Link
            to="/admin/results"
            className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
          >
            Manage Results
          </Link>



          <Link
            to="/admin/students"
            className="rounded-lg bg-slate-600 px-5 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Students
          </Link>

          <Link
            to="/admin/audit"
            className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
          >
            Audit Logs
          </Link>


        </div>


      </div>





      {/* Recent Activity */}

      <div className="overflow-hidden rounded-xl bg-white shadow">


        <div className="border-b p-5">

          <h5 className="font-semibold text-slate-800">

            Recent Result Activity

          </h5>

        </div>



        <div className="overflow-x-auto">


          <table className="w-full text-left">


            <thead className="bg-slate-100">


              <tr>

                <th className="px-5 py-3">
                  Student
                </th>

                <th className="px-5 py-3">
                  Student ID
                </th>

                <th className="px-5 py-3">
                  Academic Year
                </th>

                <th className="px-5 py-3">
                  Year
                </th>

                <th className="px-5 py-3">
                  Semester
                </th>

                <th className="px-5 py-3">
                  Status
                </th>

              </tr>


            </thead>



            <tbody>


            {
              recentUploads.length === 0 ?

              (

                <tr>

                  <td
                    colSpan="6"
                    className="py-6 text-center text-slate-500"
                  >

                    No recent uploads found.

                  </td>

                </tr>

              )

              :

              recentUploads.map(result=>(


                <tr
                  key={result._id}
                  className="border-t"
                >

                  <td className="px-5 py-3">

                    {result.student?.fullName}

                  </td>


                  <td className="px-5 py-3">

                    {result.student?.studentId}

                  </td>


                  <td className="px-5 py-3">

                    {result.academicYear}

                  </td>


                  <td className="px-5 py-3">

                    {result.year}

                  </td>


                  <td className="px-5 py-3">

                    {result.semester}

                  </td>



                  <td className="px-5 py-3">


                    {
                      result.released ?

                      (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

                          Released

                        </span>

                      )

                      :

                      (

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">

                          Locked

                        </span>

                      )

                    }


                  </td>


                </tr>


              ))

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
 * Reusable Summary Card
 * ==========================================================
 */


const SummaryCard = ({
  title,
  value,
  color=""
}) => (

  <div className="rounded-xl bg-white p-6 text-center shadow">


    <h6 className="text-sm text-slate-500">

      {title}

    </h6>


    <h2 className={`mt-2 text-3xl font-bold ${color}`}>

      {value}

    </h2>


  </div>

);



export default AdminDashboard;
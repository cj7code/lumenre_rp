/**
 * ==========================================================
 * File: pages/AuditLogs.jsx
 * ----------------------------------------------------------
 * Displays administrator activity history.
 *
 * Features:
 * - View who performed an action
 * - View action type
 * - View description
 * - View date/time
 * ==========================================================
 */


import { useEffect,useState,useContext } from "react";

import API from "../api/axios";

import { AdminAuthContext } from "../context/AdminAuthContext";



const AuditLogs = () => {


  const { adminToken } =
  useContext(AdminAuthContext);



  const [logs,setLogs] =
  useState([]);



  const [loading,setLoading] =
  useState(true);



  useEffect(()=>{

    loadLogs();

  },[]);



  const loadLogs = async()=>{


    try{


      const config = {

        headers:{

          Authorization:
          `Bearer ${adminToken}`

        }

      };


      const response =
      await API.get(
        "/audit",
        config
      );


      setLogs(
        response.data.data
      );


    }
    catch(error){


      console.error(
        "Audit loading failed:",
        error
      );


    }
    finally{

      setLoading(false);

    }


  };



  return (

    <div className="space-y-6">


      <div>

        <h2 className="text-3xl font-bold text-slate-800">

          Audit Logs

        </h2>


        <p className="text-slate-500">

          Administrator activity history

        </p>

      </div>



      <div className="overflow-hidden rounded-xl bg-white shadow">


        <div className="overflow-x-auto">


          <table className="w-full text-left">


            <thead className="bg-slate-100">


              <tr>

                <th className="px-5 py-3">
                  Administrator
                </th>


                <th className="px-5 py-3">
                  Action
                </th>


                <th className="px-5 py-3">
                  Description
                </th>


                <th className="px-5 py-3">
                  Date
                </th>


              </tr>


            </thead>



            <tbody>


            {

              loading ?

              (

                <tr>

                  <td
                    colSpan="4"
                    className="py-6 text-center"
                  >

                    Loading logs...

                  </td>

                </tr>

              )


              :


              logs.length === 0 ?

              (

                <tr>

                  <td
                    colSpan="4"
                    className="py-6 text-center text-slate-500"
                  >

                    No audit records found.

                  </td>

                </tr>

              )


              :


              logs.map(log=>(


                <tr
                  key={log._id}
                  className="border-t"
                >


                  <td className="px-5 py-3">

                    {log.admin?.fullName || "Unknown"}

                  </td>



                  <td className="px-5 py-3">


                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

                      {log.action}

                    </span>


                  </td>



                  <td className="px-5 py-3">

                    {log.description}

                  </td>



                  <td className="px-5 py-3 text-sm text-slate-500">

                    {
                      new Date(
                        log.createdAt
                      ).toLocaleString()
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


export default AuditLogs;
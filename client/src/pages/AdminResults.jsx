/**
 * ==========================================================
 * File: pages/AdminResults.jsx
 * ----------------------------------------------------------
 * Lumenre Results Portal
 *
 * Administrator Result Management
 *
 * Responsibilities:
 * - View uploaded result slips
 * - Release locked results
 * - Lock released results
 * - Search/filter results
 *
 * ==========================================================
 */

import { useEffect,useState,useContext } from "react";

import API from "../api/axios";
import { AdminAuthContext } from "../context/AdminAuthContext";


const AdminResults = () => {

  const { adminToken } = useContext(AdminAuthContext);


  const [results,setResults] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState("");

  const [selectedPdf,setSelectedPdf] = useState("");
  const [selectedStudent,setSelectedStudent] = useState("");



  const getPdfUrl = (filePath) => {

    return `${import.meta.env.VITE_SERVER_URL}/${filePath.replace(/\\/g,"/")}`;

  };



  const loadResults = async()=>{

    try{

      const response = await API.get(

        "/result-slips/admin/all",

        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }

      );


      setResults(response.data.data);


    }catch(error){

      console.error(
        "Loading results failed:",
        error
      );

    }finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    loadResults();

  },[]);





  const releaseResult = async(id)=>{

    try{

      await API.patch(
        `/result-slips/${id}/release`,
        {},
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      );

      loadResults();


    }catch(error){

      console.error(error);

    }

  };





  const lockResult = async(id)=>{

    try{

      await API.patch(
        `/result-slips/${id}/lock`,
        {},
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      );


      loadResults();


    }catch(error){

      console.error(error);

    }

  };





  const filteredResults = results.filter(item=>{

    const name =
      item.student?.fullName?.toLowerCase() || "";

    const id =
      item.student?.studentId?.toLowerCase() || "";

    const text =
      search.toLowerCase();


    return(
      name.includes(text) ||
      id.includes(text)
    );

  });





  if(loading){

    return (

      <div className="p-8">

        <h4 className="font-semibold">
          Loading results...
        </h4>

      </div>

    );

  }





  return (

    <div className="space-y-6">



      <div>

        <h2 className="text-3xl font-bold text-slate-800">
          Result Management
        </h2>


        <p className="text-slate-500">
          Release, lock and monitor student results.
        </p>

      </div>





      {/* Search */}

      <div className="rounded-xl bg-white p-5 shadow">

        <input

          type="text"

          placeholder="Search student name or ID..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="w-full rounded-lg border p-3"

        />

      </div>






      {/* Results Table */}


      <div className="overflow-hidden rounded-xl bg-white shadow">


        <div className="overflow-x-auto">


          <table className="w-full text-left">


            <thead className="bg-slate-100">


              <tr>

                <th className="px-4 py-3">
                  Student
                </th>

                <th className="px-4 py-3">
                  Student ID
                </th>

                <th className="px-4 py-3">
                  Academic Year
                </th>

                <th className="px-4 py-3">
                  Year
                </th>

                <th className="px-4 py-3">
                  Semester
                </th>

                <th className="px-4 py-3">
                  Preview
                </th>

                <th className="px-4 py-3">
                  Status
                </th>

                <th className="px-4 py-3">
                  Action
                </th>


              </tr>


            </thead>





            <tbody>


              {
                filteredResults.length === 0 ?


                (

                  <tr>

                    <td
                      colSpan="8"
                      className="py-6 text-center text-slate-500"
                    >

                      No results found.

                    </td>


                  </tr>


                )


                :


                filteredResults.map(result=>(


                  <tr
                    key={result._id}
                    className="border-t"
                  >


                    <td className="px-4 py-3">

                      {result.student?.fullName}

                    </td>


                    <td className="px-4 py-3">

                      {result.student?.studentId}

                    </td>


                    <td className="px-4 py-3">

                      {result.academicYear}

                    </td>


                    <td className="px-4 py-3">

                      {result.year}

                    </td>


                    <td className="px-4 py-3">

                      Semester {result.semester}

                    </td>





                    <td className="px-4 py-3">


                      <button

                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"

                        onClick={()=>{

                          setSelectedPdf(
                            getPdfUrl(result.filePath)
                          );

                          setSelectedStudent(
                            result.student?.fullName
                          );

                        }}

                      >

                        View PDF

                      </button>


                    </td>





                    <td className="px-4 py-3">


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





                    <td className="px-4 py-3">


                      {
                        result.released ?


                        (

                          <button

                            className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"

                            onClick={()=>lockResult(result._id)}

                          >

                            Lock

                          </button>


                        )


                        :


                        (

                          <button

                            className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"

                            onClick={()=>releaseResult(result._id)}

                          >

                            Release

                          </button>


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





      {/* PDF Preview */}


      {
        selectedPdf && (


          <div className="overflow-hidden rounded-xl bg-white shadow">


            <div className="flex items-center justify-between border-b p-5">


              <h5 className="font-semibold">

                Result Preview: {selectedStudent}

              </h5>


              <button

                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"

                onClick={()=>{

                  setSelectedPdf("");
                  setSelectedStudent("");

                }}

              >

                Close

              </button>


            </div>




            <iframe

              title="Result Preview"

              src={selectedPdf}

              className="h-[800px] w-full border-0"

            />


          </div>


        )

      }



    </div>

  );

};


export default AdminResults;
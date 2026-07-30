/**
 * ==========================================================
 * File: pages/AdminResults.jsx
 * ----------------------------------------------------------
 * Lumenre Results Portal
 *
 * Administrator Result Management
 *
 * Responsibilities:
 *
 * - View all uploaded result slips
 * - Release locked results
 * - Lock released results
 * - Search/filter results
 *
 * ==========================================================
 */


import {
  useEffect,
  useState,
  useContext
} from "react";


import API from "../api/axios";


import {
  AdminAuthContext
} from "../context/AdminAuthContext";



const AdminResults = () => {


  const {
    adminToken
  } = useContext(AdminAuthContext);

  const [results,setResults] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState("");

  // Currently selected PDF for preview
  const [selectedPdf,setSelectedPdf] = useState("");
  const [selectedStudent,setSelectedStudent] = useState("");


  const getPdfUrl = (filePath)=>{

    return `${import.meta.env.VITE_SERVER_URL}/${filePath.replace(/\\/g,"/")}`;

  };



  /**
   * Load all result slips
   */

  const loadResults = async()=>{


    try{


      const response = await API.get(

        "/result-slips/admin/all",

        {

          headers:{

            Authorization:
            `Bearer ${adminToken}`

          }

        }

      );


      setResults(

        response.data.data

      );


    }


    catch(error){


      console.error(
        "Loading results failed:",
        error
      );


    }


    finally{


      setLoading(false);


    }


  };




  useEffect(()=>{


    loadResults();


  },[]);





  /**
   * Release result
   */

  const releaseResult = async(id)=>{


    try{


      await API.patch(

        `/result-slips/${id}/release`,

        {},

        {

          headers:{

            Authorization:
            `Bearer ${adminToken}`

          }

        }

      );


      loadResults();


    }


    catch(error){


      console.error(error);


    }


  };





  /**
   * Lock result
   */

  const lockResult = async(id)=>{


    try{


      await API.patch(

        `/result-slips/${id}/lock`,

        {},

        {

          headers:{

            Authorization:
            `Bearer ${adminToken}`

          }

        }

      );



      loadResults();



    }


    catch(error){


      console.error(error);


    }


  };





  /**
   * Search filtering
   */


  const filteredResults = results.filter((item)=>{


    const name =

    item.student?.fullName
    ?.toLowerCase() || "";



    const id =

    item.student?.studentId
    ?.toLowerCase() || "";



    const searchText =

    search.toLowerCase();



    return (

      name.includes(searchText)

      ||

      id.includes(searchText)

    );


  });





  if(loading){


    return (

      <div className="container mt-5">

        <h4>

          Loading results...

        </h4>

      </div>

    );


  }





  return (


    <div className="container-fluid">



      <div className="mb-4">


        <h2>

          Result Management

        </h2>


        <p className="text-muted">

          Release, lock and monitor student results.

        </p>


      </div>





      {/* Search */}


      <div className="card shadow-sm mb-4">


        <div className="card-body">


          <input

            type="text"

            className="form-control"

            placeholder="Search student name or ID..."

            value={search}

            onChange={(e)=>

              setSearch(e.target.value)

            }

          />


        </div>


      </div>





      {/* Results Table */}


      <div className="card shadow-sm">


        <div className="table-responsive">


          <table className="table table-hover mb-0">


            <thead className="table-light">


              <tr>

                <th>
                  Student
                </th>

                <th>
                  Student ID
                </th>

                <th>
                  Academic Year
                </th>

                <th>
                  Year
                </th>

                <th>
                  Semester
                </th>

                <th>
                  Status
                </th>

                <th>
                  Preview
                </th>

                <th>
                  Action
                </th>

              </tr>


            </thead>



            <tbody>


              {


                filteredResults.length === 0


                ?


                (

                  <tr>

                    <td
                    colSpan="7"
                    className="text-center py-4"
                    >

                      No results found.

                    </td>

                  </tr>

                )


                :


                filteredResults.map((result)=>(


                  <tr key={result._id}>


                    <td>

                      {
                        result.student?.fullName
                      }

                    </td>



                    <td>

                      {
                        result.student?.studentId
                      }

                    </td>



                    <td>

                      {
                        result.academicYear
                      }

                    </td>



                    <td>

                      {
                        result.year
                      }

                    </td>



                    <td>

                      Semester {result.semester}

                    </td>

                    <td>

                    <button

                    className="btn btn-sm btn-primary"

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

                    <td>


                      {

                        result.released


                        ?

                        (

                          <span className="badge bg-success">

                            Released

                          </span>

                        )


                        :


                        (

                          <span className="badge bg-warning text-dark">

                            Locked

                          </span>

                        )


                      }


                    </td>




                    <td>


                    {

                      result.released


                      ?


                      (

                        <button

                        className="btn btn-sm btn-warning"

                        onClick={()=>lockResult(result._id)}

                        >

                          Lock

                        </button>


                      )


                      :


                      (

                        <button

                        className="btn btn-sm btn-success"

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

      {
      selectedPdf && (

       <div className="card shadow-sm mt-4">

            <div className="card-header d-flex justify-content-between align-items-center">


                <h5 className="mb-0">

                    Result Preview:

                    {" "}

                    {selectedStudent}

                </h5>

                <button

                    className="btn btn-danger btn-sm"

                    onClick={()=>{

                    setSelectedPdf("");

                    setSelectedStudent("");

                    }}

                >

                    Close

                </button>

            </div>

      <div className="card-body p-0">


      <iframe

        title="Result Preview"

        src={selectedPdf}

        width="100%"

        height="800"

        style={{

        border:"none"

        }}

        />

    </div>


    </div>

    )
    }

    </div>

  );


};



export default AdminResults;
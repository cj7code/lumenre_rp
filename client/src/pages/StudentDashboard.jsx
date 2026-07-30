/**
 * ==========================================================
 * File: pages/StudentDashboard.jsx
 * ----------------------------------------------------------
 * Lumenre Results Portal
 *
 * Student dashboard features:
 *
 * - Displays student profile
 * - Allows selecting academic year
 * - Allows selecting year of study
 * - Allows selecting semester
 * - Displays released PDF results
 * - Displays withheld result messages
 * - Secure student logout
 *
 * Note:
 * Download and Print buttons are removed because the
 * browser PDF viewer already provides these options.
 * ==========================================================
 */


import {
  useEffect,
  useState,
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../api/axios";

import {
  StudentAuthContext
} from "../context/StudentAuthContext";



const StudentDashboard = () => {


  const {
    student,
    studentToken,
    logoutStudent
  } = useContext(StudentAuthContext);



  const navigate = useNavigate();



  /**
   * ----------------------------------------------------------
   * Student logout
   * ----------------------------------------------------------
   */

  const handleLogout = () => {

    logoutStudent();

    navigate("/");

  };



  /**
   * ----------------------------------------------------------
   * Component states
   * ----------------------------------------------------------
   */

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");

  const [selectedYear, setSelectedYear] = useState("");

  const [selectedSemester, setSelectedSemester] = useState("");

  const [selectedResult, setSelectedResult] = useState(null);



  /**
   * ----------------------------------------------------------
   * Load student results from backend
   *
   * Backend should return:
   *
   * {
   * academicYear,
   * year,
   * semester,
   * released,
   * downloadUrl
   * }
   *
   * ----------------------------------------------------------
   */

  useEffect(() => {


    const fetchResults = async () => {


      try {


        const response = await API.get(

          "/result-slips/my-results",

          {

            headers: {

              Authorization:
              `Bearer ${studentToken}`

            }

          }

        );


        setResults(

          response.data.data

        );


      } catch (error) {


        setError(

          error.response?.data?.message ||

          "Unable to load results"

        );


      } finally {


        setLoading(false);

      }


    };



    if(studentToken){

      fetchResults();

    }


  }, [studentToken]);





  /**
   * ----------------------------------------------------------
   * Search selected result
   *
   * Checks:
   * - Academic year
   * - Year of study
   * - Semester
   *
   * ----------------------------------------------------------
   */

  const showResult = () => {


    const result = results.find(

      item =>

      item.academicYear === selectedAcademicYear &&

      item.year.toString() === selectedYear &&

      item.semester.toString() === selectedSemester

    );



    if(!result){


      setSelectedResult(null);


      alert(

        "No result record found for this selection."

      );


      return;


    }


    setSelectedResult(result);


  };




  /**
   * ----------------------------------------------------------
   * Loading screen
   * ----------------------------------------------------------
   */

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

    <div className="container mt-4">


      {/* ===============================
          Student Profile
      ================================= */}


      <div className="card shadow-sm mb-4">

        <div className="card-body">


          <div className="d-flex justify-content-between">


            <div>

              <h2>
                Lumenre Results Portal
              </h2>


              <h5>
                Welcome, {student?.fullName}
              </h5>


              <p className="mb-0">

                <strong>
                  Student Number:
                </strong>{" "}

                {student?.studentId}

              </p>


            </div>



            <button

              className="btn btn-outline-danger"

              onClick={handleLogout}

            >

              Logout

            </button>


          </div>


        </div>

      </div>





      {
        error && (

          <div className="alert alert-danger">

            {error}

          </div>

        )
      }




      {/* ===============================
          Result Selection
      ================================= */}


      <div className="card shadow-sm mb-4">


        <div className="card-header">

          <h5 className="mb-0">
            Find My Results
          </h5>

        </div>


        <div className="card-body">


          <div className="row g-3">



            {/* Academic Year */}

            <div className="col-md-4">

              <label className="form-label">

                Academic Year

              </label>


              <select

                className="form-select"

                value={selectedAcademicYear}

                onChange={(e)=>

                  setSelectedAcademicYear(
                    e.target.value
                  )

                }

              >

                <option value="">

                  Select Academic Year

                </option>


                {
                  [
                    ...new Set(

                      results.map(

                        item => item.academicYear

                      )

                    )

                  ]

                  .map(year => (

                    <option

                      key={year}

                      value={year}

                    >

                      {year}

                    </option>

                  ))

                }


              </select>


            </div>

                        {/* Year of Study */}

            <div className="col-md-4">

              <label className="form-label">

                Year of Study

              </label>


              <select

                className="form-select"

                value={selectedYear}

                onChange={(e) =>

                  setSelectedYear(e.target.value)

                }

              >

                <option value="">

                  Select Year

                </option>


                <option value="1">

                  Year 1

                </option>


                <option value="2">

                  Year 2

                </option>


                <option value="3">

                  Year 3

                </option>


              </select>


            </div>




            {/* Semester */}

            <div className="col-md-4">

              <label className="form-label">

                Semester

              </label>


              <select

                className="form-select"

                value={selectedSemester}

                onChange={(e) =>

                  setSelectedSemester(e.target.value)

                }

              >

                <option value="">

                  Select Semester

                </option>


                <option value="1">

                  Semester 1

                </option>


                <option value="2">

                  Semester 2

                </option>


              </select>


            </div>




            {/* Search Button */}

            <div className="col-md-12">


              <button

                className="btn btn-primary"

                onClick={showResult}

              >

                Show Result

              </button>


            </div>


          </div>


        </div>

      </div>





      {/* ===============================
          Selected Result Display
      ================================= */}


      {
        selectedResult && (


          <div className="card shadow-sm mb-4">


            <div className="card-header">


              <h5 className="mb-0">

                Result Slip

                {" - "}

                {selectedResult.academicYear}

                {" | Year "}

                {selectedResult.year}

                {" | Semester "}

                {selectedResult.semester}


              </h5>


            </div>





            <div className="card-body">


              {
                selectedResult.released ? (


                  <iframe

                    title="Student Result Slip"

                    src={selectedResult.downloadUrl}

                    width="100%"

                    height="800"

                    style={{

                      border:"none"

                    }}

                  />



                ) : (



                  <div className="alert alert-warning">


                    <h5>

                      Results Not Released

                    </h5>


                    <p className="mb-0">


                      Your results for this semester have not

                      been released because of outstanding

                      fees. Please clear your balance and

                      contact administration for assistance.


                    </p>


                  </div>



                )

              }


            </div>


          </div>


        )

      }


    </div>


  );

};


export default StudentDashboard;
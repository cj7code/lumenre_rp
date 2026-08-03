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
 * ==========================================================
 */

import { useEffect,useState,useContext } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import { StudentAuthContext } from "../context/StudentAuthContext";


const StudentDashboard = () => {

  const {
    student,
    studentToken,
    logoutStudent
  } = useContext(StudentAuthContext);


  const navigate = useNavigate();


  const [results,setResults] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  const [selectedAcademicYear,setSelectedAcademicYear] = useState("");
  const [selectedYear,setSelectedYear] = useState("");
  const [selectedSemester,setSelectedSemester] = useState("");
  const [selectedResult,setSelectedResult] = useState(null);



  const handleLogout = () => {

    logoutStudent();
    navigate("/");

  };



  useEffect(() => {

    const fetchResults = async() => {

      try {

        const response = await API.get(
          "/result-slips/my-results",
          {
            headers:{
              Authorization:`Bearer ${studentToken}`
            }
          }
        );

        setResults(response.data.data);


      } catch(error) {

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

  },[studentToken]);



  const showResult = () => {

    const result = results.find(item =>
      item.academicYear === selectedAcademicYear &&
      item.year.toString() === selectedYear &&
      item.semester.toString() === selectedSemester
    );


    if(!result){

      setSelectedResult(null);

      alert("No result record found for this selection.");

      return;

    }


    setSelectedResult(result);

  };



  if(loading){

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <h4 className="text-lg font-semibold text-slate-700">
          Loading results...
        </h4>

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-slate-100 p-4 md:p-8">


      {/* Student Profile */}

      <div className="mb-6 rounded-xl bg-white p-6 shadow">

        <div className="flex flex-col justify-between gap-4 md:flex-row">


          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Lumenre Results Portal
            </h2>


            <h5 className="mt-2 text-lg text-slate-700">
              Welcome, {student?.fullName}
            </h5>


            <p className="text-slate-600">

              <strong>Student Number:</strong>{" "}
              {student?.studentId}

            </p>


          </div>


          <button

            onClick={handleLogout}

            className="rounded-lg border border-red-600 px-5 py-2 font-semibold text-red-600 hover:bg-red-600 hover:text-white"

          >

            Logout

          </button>


        </div>

      </div>



      {error && (

        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">

          {error}

        </div>

      )}




      {/* Result Selection */}

      <div className="mb-6 rounded-xl bg-white shadow">


        <div className="border-b p-5">

          <h5 className="font-semibold text-slate-800">
            Find My Results
          </h5>

        </div>


        <div className="grid gap-4 p-5 md:grid-cols-3">


          <div>

            <label className="mb-1 block text-sm font-medium">
              Academic Year
            </label>


            <select
              className="w-full rounded-lg border p-3"
              value={selectedAcademicYear}
              onChange={e=>setSelectedAcademicYear(e.target.value)}
            >

              <option value="">
                Select Academic Year
              </option>


              {
                [...new Set(results.map(item=>item.academicYear))]
                .map(year=>(

                  <option key={year} value={year}>
                    {year}
                  </option>

                ))
              }

            </select>

          </div>



          <div>

            <label className="mb-1 block text-sm font-medium">
              Year of Study
            </label>


            <select

              className="w-full rounded-lg border p-3"

              value={selectedYear}

              onChange={e=>setSelectedYear(e.target.value)}

            >

              <option value="">
                Select Year
              </option>

              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>

            </select>


          </div>




          <div>

            <label className="mb-1 block text-sm font-medium">
              Semester
            </label>


            <select

              className="w-full rounded-lg border p-3"

              value={selectedSemester}

              onChange={e=>setSelectedSemester(e.target.value)}

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



          <button

            onClick={showResult}

            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 md:col-span-3"

          >

            Show Result

          </button>


        </div>


      </div>





      {/* Result Display */}

      {selectedResult && (

        <div className="rounded-xl bg-white shadow">


          <div className="border-b p-5 font-semibold">

            Result Slip -

            {" "}

            {selectedResult.academicYear}

            {" | Year "}

            {selectedResult.year}

            {" | Semester "}

            {selectedResult.semester}

          </div>



          <div className="p-5">


            {
              selectedResult.released ?

              (

                <iframe
                  title="Result Slip"
                  src={selectedResult.downloadUrl}
                  className="h-[800px] w-full rounded-lg border"
                />

              )

              :

              (

                <div className="rounded-lg bg-yellow-100 p-5 text-yellow-800">

                  <h5 className="font-bold">
                    Results Not Released
                  </h5>

                  <p>
                    Your results for this semester have not been released because of outstanding fees. Please clear your balance and contact administration.
                  </p>

                </div>

              )

            }


          </div>


        </div>

      )}


    </div>

  );

};


export default StudentDashboard;
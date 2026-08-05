/**
 * ==========================================================
 * File: pages/StudentDashboard.jsx
 * ----------------------------------------------------------
 * Lumenre Results Portal
 *
 * Student Dashboard
 *
 * Features:
 * - Displays student profile
 * - Secure student logout
 * - Search results by academic year/year/semester
 * - Displays released result slips
 * - Displays locked result messages
 * - Professional PDF preview modal
 *
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

import PortalLayout from "../components/PortalLayout";

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



  const [results,setResults] = useState([]);

  const [loading,setLoading] = useState(true);

  const [error,setError] = useState("");



  const [
    selectedAcademicYear,
    setSelectedAcademicYear
  ] = useState("");

  const [
    selectedYear,
    setSelectedYear
  ] = useState("");

  const [
    selectedSemester,
    setSelectedSemester
  ] = useState("");



  const [
    selectedResult,
    setSelectedResult
  ] = useState(null);



  const [
    pdfOpen,
    setPdfOpen
  ] = useState(false);





  // ==========================================================
  // Load Student Results
  // ==========================================================

  useEffect(()=>{


    const loadResults = async()=>{


      try{


        const response = await API.get(

          "/result-slips/my-results",

          {
            headers:{
              Authorization:
              `Bearer ${studentToken}`
            }
          }

        );


        setResults(
          response.data.data
        );


      }

      catch(error){


        setError(

          error.response?.data?.message ||

          "Unable to load results."

        );


      }

      finally{

        setLoading(false);

      }


    };



    if(studentToken){

      loadResults();

    }


  },[studentToken]);







  // ==========================================================
  // Logout Student
  // ==========================================================

  const handleLogout = ()=>{

    logoutStudent();

    navigate("/");

  };







  // ==========================================================
  // Search Selected Result
  // ==========================================================

  const searchResult = ()=>{


    const result = results.find(item =>

      item.academicYear === selectedAcademicYear &&

      item.year.toString() === selectedYear &&

      item.semester.toString() === selectedSemester

    );



    if(!result){

      setSelectedResult(null);

      alert(
        "No result found for the selected period."
      );

      return;

    }



    setSelectedResult(result);

  };







  if(loading){


    return (

      <PortalLayout>

        <div className="flex flex-1 items-center justify-center">

          <p className="text-slate-600">

            Loading student portal...

          </p>

        </div>

      </PortalLayout>

    );


  }







  return (

    <PortalLayout>


      <div className="
        mx-auto
        w-full
        max-w-5xl
        space-y-5
      ">



        {/* ==================================================
            Student Profile
        =================================================== */}


        <div className="
          flex
          flex-col
          justify-between
          gap-3
          rounded-xl
          bg-white
          p-5
          shadow
          md:flex-row
          md:items-center
        ">


          <div>


            <h1 className="
              text-xl
              font-bold
              text-slate-800
            ">

              Welcome,
              {" "}
              {student?.fullName}

            </h1>



            <p className="
              text-sm
              text-slate-500
            ">

              Student ID:

              <span className="
                ml-1
                font-semibold
                text-slate-700
              ">

                {student?.studentId}

              </span>

            </p>


          </div>




          <button

            onClick={handleLogout}

            className="
              rounded-lg
              border
              border-red-500
              px-4
              py-2
              text-sm
              font-semibold
              text-red-600
              transition
              hover:bg-red-600
              hover:text-white
            "

          >

            Logout

          </button>



        </div>





        {
          error && (

            <div className="
              rounded-lg
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







        {/* ==================================================
            Result Search Section
        =================================================== */}


        <div className="
          rounded-xl
          bg-white
          shadow
        ">



          <div className="
            border-b
            px-5
            py-4
          ">


            <h2 className="
              font-semibold
              text-slate-800
            ">

              Find Results

            </h2>


            <p className="
              text-sm
              text-slate-500
            ">

              Select your academic period.

            </p>


          </div>





          <div className="
            grid
            gap-4
            p-5
            md:grid-cols-3
          ">


            <SelectBox

              label="Academic Year"

              value={selectedAcademicYear}

              setValue={setSelectedAcademicYear}

              options={
                [
                  ...new Set(
                    results.map(
                      item=>item.academicYear
                    )
                  )
                ]
              }

            />



            <SelectBox

              label="Year of Study"

              value={selectedYear}

              setValue={setSelectedYear}

              options={[
                "1",
                "2",
                "3"
              ]}

              prefix="Year"

            />



            <SelectBox

              label="Semester"

              value={selectedSemester}

              setValue={setSelectedSemester}

              options={[
                "1",
                "2"
              ]}

              prefix="Semester"

            />


          </div>





          <div className="px-5 pb-5">


            <button

              onClick={searchResult}

              className="
                w-full
                rounded-lg
                bg-blue-700
                py-2.5
                text-sm
                font-semibold
                text-white
                hover:bg-blue-800
              "

            >

              View Result

            </button>


          </div>


        </div>







        {/* ==================================================
            Selected Result Header
        ================================================== */}

        {
          selectedResult && (

            <div className="rounded-xl bg-white shadow">


              <div className="
                border-b
                px-5
                py-4
                text-center
              ">


                <h2 className="
                  text-lg
                  font-bold
                  text-slate-800
                ">

                  Result Slip

                </h2>


                <p className="
                  mt-1
                  text-sm
                  font-medium
                  text-slate-500
                ">

                  {selectedResult.academicYear}

                  {" | Year "}

                  {selectedResult.year}

                  {" | Semester "}

                  {selectedResult.semester}


                </p>


              </div>


              <div className="p-5">


                {
                  selectedResult.released ?


                  (

                    <button

                      onClick={()=>setPdfOpen(true)}

                      className="
                        mx-auto
                        block
                        rounded-lg
                        bg-blue-700
                        px-6
                        py-2
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-800
                      "

                    >

                      View Result Slip

                    </button>


                  )


                  :

                  (

                    <div className="
                      rounded-lg
                      bg-yellow-100
                      p-4
                      text-sm
                      text-yellow-800
                    ">

                      <strong>
                        Results Not Released
                      </strong>


                      <p className="mt-1">

                        Please contact administration.

                      </p>


                    </div>

                  )


                }


              </div>


            </div>

          )
        }






        {/* ==================================================
            PDF Modal Viewer
        =================================================== */}


        {
          pdfOpen && (


            <div className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/60
              p-4
            ">


              <div className="
                h-[90vh]
                w-full
                max-w-5xl
                rounded-xl
                bg-white
                p-4
              ">


                <div className="
                  mb-3
                  flex
                  justify-between
                ">


                  <h3 className="font-semibold">

                    Result Slip Preview

                  </h3>


                  <button

                    onClick={()=>setPdfOpen(false)}

                    className="
                      rounded
                      bg-red-600
                      px-3
                      py-1
                      text-sm
                      text-white
                    "

                  >

                    Close

                  </button>


                </div>




                <iframe

                  title="Result Slip"

                  src={selectedResult.downloadUrl}

                  className="
                    h-[80vh]
                    w-full
                    rounded-lg
                    border
                  "

                />


              </div>


            </div>


          )

        }



      </div>


    </PortalLayout>


  );


};






// ==========================================================
// Reusable Select Component
// ==========================================================

const SelectBox = ({
  label,
  value,
  setValue,
  options,
  prefix=""
}) => (

  <div>


    <label className="
      mb-1
      block
      text-sm
      font-medium
      text-slate-700
    ">

      {label}

    </label>


    <select

      value={value}

      onChange={
        e=>setValue(e.target.value)
      }

      className="
        h-10
        w-full
        rounded-lg
        border
        border-slate-300
        px-3
        text-sm
        focus:ring-2
        focus:ring-blue-200
      "

    >


      <option value="">
        Select
      </option>



      {
        options.map(option=>(

          <option
            key={option}
            value={option}
          >

            {prefix} {option}

          </option>

        ))
      }


    </select>


  </div>

);



export default StudentDashboard;
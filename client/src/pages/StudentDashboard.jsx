/**
 * ==========================================================
 * pages/StudentDashboard.jsx
 * ----------------------------------------------------------
 * Displays student's released result slips.
 * ==========================================================
 */


import {
  useEffect,
  useState,
  useContext
} from "react";


import API from "../api/axios";


import { StudentAuthContext } from "../context/StudentAuthContext";


const StudentDashboard = () => {

  const {
  student,
  studentToken
} = useContext(StudentAuthContext);


  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPdf, setSelectedPdf] = useState("");

  useEffect(()=>{

    const fetchResults = async()=>{

      try{
        const response =
        await API.get(
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
          "Unable to load results"

        );

      }
      finally{

        setLoading(false);

      }

    };

    if (studentToken) {
      fetchResults();
    }

  },[studentToken]);


  if(loading){

    return (

      <h2>
        Loading results...
      </h2>

    );

  }


  return (

    <div className="container mt-4">

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h2>

            Lumenre Results Portal

          </h2>

          <hr />

          <h4>

            Welcome,

            {" "}

            {student?.fullName}

          </h4>

          <p className="mb-1">

            <strong>

              Student Number:

            </strong>

            {" "}

            {student?.studentId}

          </p>

        </div>

      </div>


      <h4 className="mb-3">

        My Result Slips

      </h4>


      {

        error && (

          <div className="alert alert-danger">

            {error}

          </div>

        )

      }


      {

        results.length === 0 && !error && (

          <div className="alert alert-info">

            No released result slips are currently available.

          </div>

        )

      }


      {

        results.map((result)=>(

          <div

            key={result._id}

            className="card shadow-sm mb-3"

          >

            <div className="card-body">

              <div className="row">

                <div className="col-md-8">

                  <p>

                    <strong>

                      Academic Year:

                    </strong>

                    {" "}

                    {result.academicYear}

                  </p>

                  <p>

                    <strong>

                      Year:

                    </strong>

                    {" "}

                    {result.year}

                  </p>

                  <p>

                    <strong>

                      Semester:

                    </strong>

                    {" "}

                    {result.semester}

                  </p>

                  <p>

                    <strong>

                      Uploaded:

                    </strong>

                    {" "}

                    {

                      new Date(

                        result.createdAt

                      ).toLocaleDateString()

                    }

                  </p>

                </div>

                <div className="col-md-4 d-flex align-items-center">

                  <div className="d-flex gap-2">

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setSelectedPdf(result.downloadUrl)}
                    >

                    View

                    </button>

                    <a
                      href={result.downloadUrl}
                      download={`Result_Year${result.year}_Semester${result.semester}.pdf`}
                      className="btn btn-success btn-sm"
                    >

                    Download

                    </a>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {

                        setSelectedPdf(result.downloadUrl);

                        setTimeout(() => {

                          const iframe = document.getElementById("pdfViewer");

                          iframe.contentWindow.print();

                        }, 500);

                      }}
                    >

                    Print

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        ))

      }
      {

      selectedPdf && (

      <div className="card shadow-sm mt-4">

      <div className="card-header d-flex justify-content-between align-items-center">

      <h5 className="mb-0">

        Result Slip Preview

      </h5>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => setSelectedPdf("")}
      >

      Close

      </button>

      </div>

      <div className="card-body p-0">

        <iframe

          id="pdfViewer"

          title="Result Slip"

          src={selectedPdf}

          width="100%"

          height="800"

          style={{
          border:"none"
          }}

        >

        </iframe>

      </div>

      </div>

      )

      }

    </div>
    
  );
};


export default StudentDashboard;
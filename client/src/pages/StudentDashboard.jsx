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

    <div>

      <h1>
        Welcome {student?.fullName}
      </h1>

      <h3>
        My Result Slips
      </h3>

      {error && (

        <p>
          {error}
        </p>

      )}

      {
        results.length === 0 && !error && (

          <p>
            No released results available.
          </p>

        )
      }

      {
        results.map((result)=>(

          <div
          key={result.id}
          >

            <h4>

              Academic Year:
              {" "}
              {result.academicYear}

            </h4>

            <p>

              Year {result.year}
              {" "}
              Semester {result.semester}

            </p>

            <a

            href={result.downloadUrl}
            target="_blank"
            rel="noreferrer"

            >

              View / Download Result Slip

            </a>

          </div>

        ))
      }

    </div>
  );
};


export default StudentDashboard;
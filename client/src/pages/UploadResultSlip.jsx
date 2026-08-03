/**
 * ==========================================================
 * File: pages/UploadResultSlip.jsx
 * ----------------------------------------------------------
 * Allows an administrator to upload PDF result slips.
 * ==========================================================
 */

import { useEffect,useState,useContext } from "react";

import API from "../api/axios";
import { AdminAuthContext } from "../context/AdminAuthContext";


const UploadResultSlip = () => {

  const { adminToken } = useContext(AdminAuthContext);

  const [students,setStudents] = useState([]);
  const [message,setMessage] = useState("");
  const [file,setFile] = useState(null);


  const [formData,setFormData] = useState({
    student:"",
    academicYear:"2026",
    year:"1",
    semester:"1"
  });



  useEffect(()=>{

    const fetchStudents = async()=>{

      try{

        const response = await API.get(
          "/students/admin/all",
          {
            headers:{
              Authorization:`Bearer ${adminToken}`
            }
          }
        );


        setStudents(
          response.data.data || []
        );


      }catch(error){

        console.error(error);

      }

    };


    fetchStudents();

  },[adminToken]);




  const handleChange = (e)=>{

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  };



  const handleSubmit = async(e)=>{

    e.preventDefault();


    const uploadData = new FormData();


    uploadData.append(
      "student",
      formData.student
    );

    uploadData.append(
      "academicYear",
      formData.academicYear
    );

    uploadData.append(
      "year",
      formData.year
    );

    uploadData.append(
      "semester",
      formData.semester
    );

    uploadData.append(
      "file",
      file
    );



    try{


      const response = await API.post(

        "/result-slips/upload",

        uploadData,

        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }

      );


      setMessage(
        response.data.message
      );


    }catch(error){


      setMessage(
        error.response?.data?.message ||
        "Upload failed."
      );


    }

  };




  return (

    <div className="max-w-3xl space-y-6">


      <div>

        <h2 className="text-3xl font-bold text-slate-800">
          Upload Result Slip
        </h2>

        <p className="text-slate-500">
          Upload individual student PDF result slips.
        </p>

      </div>




      <div className="rounded-xl bg-white p-6 shadow">


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >



          <div>

            <label className="mb-1 block text-sm font-medium">
              Student
            </label>


            <select

              className="w-full rounded-lg border p-3"

              name="student"

              value={formData.student}

              onChange={handleChange}

              required

            >

              <option value="">
                Select Student
              </option>


              {
                students.map(student=>(

                  <option
                    key={student._id}
                    value={student._id}
                  >

                    {student.fullName} ({student.studentId})

                  </option>

                ))
              }


            </select>


          </div>





          <div>

            <label className="mb-1 block text-sm font-medium">
              Academic Year
            </label>


            <input

              className="w-full rounded-lg border p-3"

              name="academicYear"

              value={formData.academicYear}

              onChange={handleChange}

            />

          </div>





          <div>

            <label className="mb-1 block text-sm font-medium">
              Year
            </label>


            <select

              className="w-full rounded-lg border p-3"

              name="year"

              value={formData.year}

              onChange={handleChange}

            >

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





          <div>

            <label className="mb-1 block text-sm font-medium">
              Semester
            </label>


            <select

              className="w-full rounded-lg border p-3"

              name="semester"

              value={formData.semester}

              onChange={handleChange}

            >

              <option value="1">
                Semester 1
              </option>

              <option value="2">
                Semester 2
              </option>


            </select>


          </div>





          <div>

            <label className="mb-1 block text-sm font-medium">
              PDF Result Slip
            </label>


            <input

              type="file"

              accept=".pdf"

              className="w-full rounded-lg border p-3"

              onChange={(e)=>setFile(e.target.files[0])}

              required

            />


          </div>





          <button

            type="submit"

            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"

          >

            Upload Result Slip

          </button>



        </form>


      </div>





      {
        message && (

          <div className="rounded-lg bg-blue-100 p-4 text-blue-700">

            {message}

          </div>

        )
      }



    </div>

  );

};


export default UploadResultSlip;
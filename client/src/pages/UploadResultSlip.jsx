/**
 * ==========================================================
 * pages/UploadResultSlip.jsx
 * ----------------------------------------------------------
 * Allows an administrator to upload PDF result slips.
 * ==========================================================
 */

import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AdminAuthContext } from "../context/AdminAuthContext";

const UploadResultSlip = () => {

  const { adminToken } = useContext(AdminAuthContext);
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    student: "",
    academicYear: "2026",
    year: "1",
    semester: "1"
  });

  const [file, setFile] = useState(null);

  useEffect(() => {

    const fetchStudents = async () => {

      try {

        const response = await API.get(
          "/students/admin/all",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`
            }
          }
        );

        setStudents(response.data.data || []);

      } catch (error) {

        console.error(error);

      }

    };

    fetchStudents();

  }, [adminToken]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleFileChange = (e) => {

    setFile(e.target.files[0]);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const uploadData = new FormData();

    uploadData.append("student", formData.student);
    uploadData.append("academicYear", formData.academicYear);
    uploadData.append("year", formData.year);
    uploadData.append("semester", formData.semester);
    uploadData.append("file", file);

    try {

      const response = await API.post(

        "/result-slips/upload",

        uploadData,

        {

          headers: {

            Authorization: `Bearer ${adminToken}`

          }

        }

      );

      setMessage(response.data.message);

    } catch (error) {

      setMessage(

        error.response?.data?.message ||

        "Upload failed."

      );

    }

  };

  return (

    <div className="container mt-4">

      <h2>Upload Result Slip</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label className="form-label">

            Student

          </label>

          <select
            className="form-select"
            name="student"
            value={formData.student}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Student
            </option>

            {

              students.map(student => (

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

        <div className="mb-3">

          <label className="form-label">

            Academic Year

          </label>

          <input
            className="form-control"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">

            Year

          </label>

          <select
            className="form-select"
            name="year"
            value={formData.year}
            onChange={handleChange}
          >

            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>

          </select>

        </div>

        <div className="mb-3">

          <label className="form-label">

            Semester

          </label>

          <select
            className="form-select"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
          >

            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>

          </select>

        </div>

        <div className="mb-3">

          <label className="form-label">

            PDF Result Slip

          </label>

          <input
            type="file"
            accept=".pdf"
            className="form-control"
            onChange={handleFileChange}
            required
          />

        </div>

        <button
          className="btn btn-primary"
          type="submit"
        >

          Upload Result Slip

        </button>

      </form>

      {

        message && (

          <div className="alert alert-info mt-3">

            {message}

          </div>

        )

      }

    </div>

  );

};

export default UploadResultSlip;
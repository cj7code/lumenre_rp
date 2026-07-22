/**
 * ==========================================================
 * File: pages/Students.jsx
 * ----------------------------------------------------------
 * Admin student management page.
 * ==========================================================
 */

import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AdminAuthContext } from "../context/AdminAuthContext";

const Students = () => {

  const { adminToken } = useContext(AdminAuthContext);

  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    year: "1",
    semester: "1"
  });


  useEffect(() => {

    loadStudents();

  }, []);


  const loadStudents = async () => {

    try {

      const response = await API.get(
        "/students/admin/all",
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );

      setStudents(response.data.data);

    } catch(error) {

      console.error(error);

    }

  };


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  const addStudent = async (e) => {

    e.preventDefault();


    try {

      await API.post(
        "/students",
        formData,
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      );


      setFormData({

        fullName:"",
        studentId:"",
        year:"1",
        semester:"1"

      });


      loadStudents();


    } catch(error){

      console.error(error);

    }

  };


  const toggleStatus = async(id)=>{

    try{

      await API.patch(

        `/students/${id}/status`,

        {},

        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }

      );


      loadStudents();


    }catch(error){

      console.error(error);

    }

  };


  const deleteStudent = async(id)=>{


    const confirmDelete =
    window.confirm(
      "Delete this student?"
    );


    if(!confirmDelete) return;


    try{

      await API.delete(

        `/students/${id}`,

        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }

      );


      loadStudents();


    }catch(error){

      console.error(error);

    }

  };


  const filteredStudents =
  students.filter((student)=>{

    const text =
    search.toLowerCase();


    return (

      student.fullName
      .toLowerCase()
      .includes(text)

      ||

      student.studentId
      .toLowerCase()
      .includes(text)

    );

  });


  return (

    <div className="container-fluid">


      <div className="d-flex justify-content-between mb-3">

        <div>

          <h2>
            Students
          </h2>

          <p className="text-muted">

            Total Students:
            {" "}
            {students.length}

          </p>

        </div>


      </div>



      <div className="card shadow-sm mb-4">

        <div className="card-header">

          <h5>
            Add New Student
          </h5>

        </div>


        <div className="card-body">


          <form
            onSubmit={addStudent}
            className="row g-3"
          >


            <div className="col-md-3">

              <input

                className="form-control"

                name="fullName"

                placeholder="Full Name"

                value={formData.fullName}

                onChange={handleChange}

                required

              />

            </div>


            <div className="col-md-3">

              <input

                className="form-control"

                name="studentId"

                placeholder="Student ID"

                value={formData.studentId}

                onChange={handleChange}

                required

              />

            </div>


            <div className="col-md-2">

              <select

                className="form-select"

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


            <div className="col-md-2">

              <select

                className="form-select"

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


            <div className="col-md-2">

              <button
                className="btn btn-primary w-100"
              >

                Add Student

              </button>


            </div>


          </form>


        </div>

      </div>



      <input

        className="form-control mb-3"

        placeholder="Search by name or student ID"

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

      />



      <div className="table-responsive">


        <table className="table table-striped">


          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Year</th>

              <th>Semester</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>


          <tbody>


          {

            filteredStudents.map((student)=>(

              <tr key={student._id}>


                <td>
                  {student.studentId}
                </td>


                <td>
                  {student.fullName}
                </td>


                <td>
                  {student.year}
                </td>


                <td>
                  {student.semester}
                </td>


                <td>

                  {
                    student.isActive

                    ?

                    <span className="badge bg-success">
                      Active
                    </span>

                    :

                    <span className="badge bg-danger">
                      Inactive
                    </span>

                  }

                </td>


                <td>

                  <button

                    className="btn btn-sm btn-warning me-2"

                    onClick={()=>toggleStatus(student._id)}

                  >

                    {
                      student.isActive
                      ?
                      "Disable"
                      :
                      "Activate"
                    }


                  </button>



                  <button

                    className="btn btn-sm btn-danger"

                    onClick={()=>deleteStudent(student._id)}

                  >

                    Delete

                  </button>


                </td>


              </tr>


            ))

          }


          </tbody>


        </table>


      </div>


    </div>

  );

};


export default Students;
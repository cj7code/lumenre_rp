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
  const [editingStudent,setEditingStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [message, setMessage] = useState("");
  const [importing, setImporting] = useState(false);

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

  const startEdit = (student)=>{

    setEditingStudent(student);

    setFormData({

      fullName:student.fullName,
      studentId:student.studentId,
      year:student.year,
      semester:student.semester

    });

  };

  const updateStudent = async(e)=>{e.preventDefault();

    try{

      await API.put(

        `/students/${editingStudent._id}`,

        formData,

        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }

      );


      setEditingStudent(null);


      setFormData({

        fullName:"",
        studentId:"",
        year:"1",
        semester:"1"

      });


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

  const handleExcelChange = (e) => {

    setExcelFile(e.target.files[0]);

  };

  const importStudents = async () => {

    if (!excelFile) {

      setMessage("Please select an Excel file.");

      return;

    }

    try {

      setImporting(true);

      const formData = new FormData();

      formData.append("file", excelFile);

      const response = await API.post(

        "/bulk-students/import",

        formData,

        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }

      );

      const result = response.data.data;

      setMessage(

        `Imported: ${result.imported} | ` +

        `Duplicates: ${result.duplicates} | ` +

        `Errors: ${result.errors}`

      );

      loadStudents();

      setExcelFile(null);

    } catch (error) {

      setMessage(

        error.response?.data?.message ||

        "Import failed."

      );

    } finally {

      setImporting(false);

    }

  };


  const exportStudents = async () => {

    try {

      const response = await API.get(
        "/bulk-students/export",

        {

          responseType: "blob",

          headers: {
            Authorization:
            `Bearer ${adminToken}`

          }

        }

      );

      const url =
        window.URL.createObjectURL(

          new Blob([response.data])

        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download = "Students.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (error) {

      console.error(error);

    }

  };


  return (

    <div className="container-fluid">


      <div className="d-flex justify-content-between mb-3">
        <div>
          <h2>Student Management</h2>
          <p className="text-muted mb-0">
            Total Students: {filteredStudents.length}
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
            onSubmit={
              editingStudent
              ? updateStudent
              : addStudent
            }
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
                {
                  editingStudent
                  ?
                  "Update Student"
                  :
                  "Add Student"
                }
              </button>

              {
              editingStudent && (

              <button
              type="button"
              className="btn btn-secondary mt-3"
              onClick={()=>{

              setEditingStudent(null);

              setFormData({

              fullName:"",
              studentId:"",
              year:"1",
              semester:"1"

              });

              }}
              >
              Cancel
              </button>

              )
              }


            </div>

          </form>

        </div>

      </div>

      <div className="card mb-4">

        <div className="card-body">

          <h5 className="mb-3">

            Bulk Student Import

          </h5>

          <div className="row">

            <div className="col-md-8">

              <input
                type="file"
                accept=".xlsx,.xls"
                className="form-control"
                onChange={handleExcelChange}
              />

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-success w-100"
                onClick={importStudents}
                disabled={importing}
              >

                {

                  importing

                  ? "Importing..."

                  : "Import Students"

                }

              </button>
              <a
                href="/StudentTemplate.xlsx"
                className="btn btn-outline-primary w-100 mt-2"
                download
              >

                Download Template

              </a>

              <button

              className="btn btn-outline-success w-100 mt-2"

              onClick={exportStudents}

              >

              Export Students

              </button>

            </div>

          </div>

          {

            message && (

              <div className="alert alert-info mt-3 mb-0">

                {message}

              </div>

            )

          }

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
                  className="btn btn-sm btn-primary me-2"
                  onClick={()=>startEdit(student)}
                  >
                  Edit
                  </button>

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
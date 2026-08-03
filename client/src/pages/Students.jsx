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

  const [students,setStudents] = useState([]);
  const [selectedStudents,setSelectedStudents] = useState([]);

  const [page,setPage] = useState(1);
  const [limit,setLimit] = useState(25);
  const [totalPages,setTotalPages] = useState(1);
  const [totalStudents,setTotalStudents] = useState(0);

  const [editingStudent,setEditingStudent] = useState(null);

  const [search,setSearch] = useState("");
  const [yearFilter,setYearFilter] = useState("");
  const [semesterFilter,setSemesterFilter] = useState("");
  const [statusFilter,setStatusFilter] = useState("");

  const [excelFile,setExcelFile] = useState(null);
  const [message,setMessage] = useState("");
  const [importing,setImporting] = useState(false);


  const [formData,setFormData] = useState({
    fullName:"",
    studentId:"",
    year:"1",
    semester:"1"
  });



  useEffect(()=>{

    loadStudents();

  },[
    adminToken,
    page,
    limit,
    search,
    yearFilter,
    semesterFilter,
    statusFilter
  ]);


  // Load students from the server
  const loadStudents = async()=>{

    try{

      const response = await API.get(

        "/students/admin/all",

        {
          params:{
            page,
            limit,
            search,
            year:yearFilter,
            semester:semesterFilter,
            status:statusFilter
          },

          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }

      );


      setStudents(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalStudents(response.data.totalStudents);


    }catch(error){

      console.error(error);

    }

  };



  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };

  // Add a new student
  const addStudent=async(e)=>{

    e.preventDefault();

    try{

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


    }catch(error){

      console.error(error);

    }

  };


  // Toggle status of a student
  const toggleStatus=async(id)=>{

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

  // Start editing a student
  const startEdit=(student)=>{

    setEditingStudent(student);

    setFormData({

      fullName:student.fullName,
      studentId:student.studentId,
      year:student.year,
      semester:student.semester

    });

  };



  // Update an existing student
  const updateStudent=async(e)=>{

    e.preventDefault();

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


  //Download official student import template
  const downloadTemplate = async()=>{

    try{

      const response = await API.get(
        "/bulk-students/template",
        {
          responseType:"blob",

          headers:{
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


      link.href=url;

      link.download=
      "StudentTemplate.xlsx";


      document.body.appendChild(link);

      link.click();


      link.remove();

      window.URL.revokeObjectURL(url);


    }
    catch(error){

      console.error(
        "Template download failed:",
        error
      );

    }

  };


  // Bulk Student Import
  const importStudents = async () => {

    if(!excelFile){

      setMessage("Please select an Excel file.");

      return;

    }

    try {

      setImporting(true);

      const formData = new FormData();

      formData.append(
        "file",
        excelFile
      );

      const response = await API.post(
        "/bulk-students/import",
        formData,
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
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


    }
    catch(error){

      setMessage(
        error.response?.data?.message ||
        "Import failed."
      );

    }
    finally{

      setImporting(false);

    }

  };


  const handleExcelChange = (e) => {

  setExcelFile(
      e.target.files[0]
    );

  };

  // Toggle selection of a student
  const toggleStudentSelection = (id) => {

    setSelectedStudents(prev =>

      prev.includes(id)

      ?

      prev.filter(
        studentId => studentId !== id
      )

      :

      [
        ...prev,
        id
      ]

    );

  };


  // Select or deselect all students
  const selectAllStudents = () => {

    if(selectedStudents.length === students.length){

      setSelectedStudents([]);

    }
    else{

      setSelectedStudents(
        students.map(student => student._id)
      );

    }

  };


  // Bulk actions: activate, deactivate, delete
  const exportStudents = async () => {

    try {

      const response = await API.get(
        "/bulk-students/export",
        {
          responseType:"blob",
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      );


      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );


      const link = document.createElement("a");

      link.href = url;

      link.download = "Students.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();


    } catch(error) {

      console.error(
        "Export failed:",
        error
      );

    }

  };


  return (

    <div className="w-full">


      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">


        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Student Management
          </h2>


          <p className="text-slate-500">

            Showing

            <span className="font-semibold mx-1">
              {students.length}
            </span>

            of

            <span className="font-semibold mx-1">
              {totalStudents}
            </span>

            students

          </p>

        </div>



        <button

          className="mt-3 md:mt-0 rounded-lg border border-green-600 px-4 py-2 text-green-700 hover:bg-green-600 hover:text-white"

          onClick={exportStudents}

        >

          Export Students

        </button>


      </div>




      {/* Add / Edit Student */}


      <div className="rounded-xl bg-white shadow mb-6">


        <div className="border-b px-6 py-4">

          <h5 className="font-semibold text-lg">

            {editingStudent ? "Edit Student" : "Add New Student"}

          </h5>

        </div>



        <div className="p-6">


          <form

            onSubmit={
              editingStudent
              ? updateStudent
              : addStudent
            }

            className="grid grid-cols-1 md:grid-cols-12 gap-4"

          >


            <div className="md:col-span-3">

              <input

                className="w-full rounded-lg border px-4 py-2"

                name="fullName"

                placeholder="Full Name"

                value={formData.fullName}

                onChange={handleChange}

                required

              />

            </div>



            <div className="md:col-span-3">

              <input

                className="w-full rounded-lg border px-4 py-2"

                name="studentId"

                placeholder="Student ID"

                value={formData.studentId}

                onChange={handleChange}

                required

              />

            </div>



            <div className="md:col-span-2">

              <select

                className="w-full rounded-lg border px-4 py-2"

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



            <div className="md:col-span-2">

              <select

                className="w-full rounded-lg border px-4 py-2"

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



            <div className="md:col-span-2">

              <button

                className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"

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

                    className="mt-2 w-full rounded-lg bg-slate-500 py-2 text-white"

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

            {/* Bulk Student Import */}

      <div className="rounded-xl bg-white shadow mb-6">


        <div className="p-6">


          <h5 className="mb-4 text-lg font-semibold">

            Bulk Student Import

          </h5>



          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">


            <div className="md:col-span-8">


              <input

                type="file"

                accept=".xlsx,.xls"

                className="w-full rounded-lg border px-4 py-2"

                onChange={handleExcelChange}

              />


            </div>


            <div className="md:col-span-4">


              <button

                className="w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"

                onClick={importStudents}

                disabled={importing}

              >

                {
                  importing
                  ?
                  "Importing..."
                  :
                  "Import Students"
                }


              </button>

              <button
              onClick={downloadTemplate}
              className="w-full mt-2 px-4 py-2 rounded-lg border  border-blue-600 text-blue-600  font-medium hover:bg-blue-600  hover:text-white  transition  duration-200"              
              >
              Download Template
              </button>

            </div>


          </div>


          {
            message && (

              <div className="mt-4 rounded-lg bg-blue-100 px-4 py-3 text-blue-700">

                {message}

              </div>

            )
          }


        </div>


      </div>


      {/* Filters */}


      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">


        <div className="md:col-span-3">


          <select

            className="w-full rounded-lg border px-4 py-2"

            value={yearFilter}

            onChange={(e)=>{

              setYearFilter(e.target.value);

              setPage(1);

            }}

          >

            <option value="">
              All Years
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


        <div className="md:col-span-3">


          <select

            className="w-full rounded-lg border px-4 py-2"

            value={semesterFilter}

            onChange={(e)=>{

              setSemesterFilter(e.target.value);

              setPage(1);

            }}

          >

            <option value="">
              All Semesters
            </option>

            <option value="1">
              Semester 1
            </option>

            <option value="2">
              Semester 2
            </option>


          </select>


        </div>


        <div className="md:col-span-3">


          <select

            className="w-full rounded-lg border px-4 py-2"

            value={statusFilter}

            onChange={(e)=>{

              setStatusFilter(e.target.value);

              setPage(1);

            }}

          >

            <option value="">
              All Status
            </option>

            <option value="true">
              Active
            </option>

            <option value="false">
              Inactive
            </option>


          </select>


        </div>


        <div className="md:col-span-3">


          <button

            className="w-full rounded-lg bg-slate-600 py-2 text-white hover:bg-slate-700"

            onClick={()=>{

              setSearch("");

              setYearFilter("");

              setSemesterFilter("");

              setStatusFilter("");

            }}

          >

            Clear Filters


          </button>


        </div>


      </div>


      {/* Search */}


      <input

        className="mb-4 w-full rounded-lg border px-4 py-2"

        placeholder="Search by name or student ID"

        value={search}

        onChange={(e)=>{

          setSearch(e.target.value);

          setPage(1);

        }}

      />


      {/* Bulk Actions */}


      <div className="mb-5 flex flex-wrap gap-3">


        <button

          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"

          onClick={()=>bulkAction("activate")}

        >

          Activate Selected

        </button>


        <button

          className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"

          onClick={()=>bulkAction("deactivate")}

        >

          Deactivate Selected

        </button>


        <button

          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"

          onClick={()=>bulkAction("delete")}

        >

          Delete Selected

        </button>


      </div>


      {/* Students Table */}


      <div className="overflow-x-auto rounded-xl bg-white shadow">


        <table className="w-full text-left">


          <thead className="border-b bg-slate-100">


            <tr>


              <th className="px-4 py-3">


                <input

                  type="checkbox"

                  checked={

                    selectedStudents.length === students.length &&

                    students.length > 0

                  }

                  onChange={selectAllStudents}

                />


              </th>


              <th className="px-4 py-3">
                ID
              </th>


              <th className="px-4 py-3">
                Name
              </th>


              <th className="px-4 py-3">
                Year
              </th>


              <th className="px-4 py-3">
                Semester
              </th>


              <th className="px-4 py-3">
                Status
              </th>


              <th className="px-4 py-3">
                Actions
              </th>


            </tr>


          </thead>


          <tbody>
                        {
              students.map((student)=>(

                <tr
                  key={student._id}
                  className="border-b hover:bg-slate-50"
                >


                  <td className="px-4 py-3">

                    <input

                      type="checkbox"

                      checked={
                        selectedStudents.includes(student._id)
                      }

                      onChange={()=>toggleStudentSelection(student._id)}

                    />

                  </td>



                  <td className="px-4 py-3">

                    {student.studentId}

                  </td>



                  <td className="px-4 py-3">

                    {student.fullName}

                  </td>



                  <td className="px-4 py-3">

                    {student.year}

                  </td>



                  <td className="px-4 py-3">

                    {student.semester}

                  </td>



                  <td className="px-4 py-3">


                    {
                      student.isDeleted

                      ?

                      <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-white">

                        Deleted

                      </span>


                      :


                      student.isActive


                      ?

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

                        Active

                      </span>


                      :


                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">

                        Inactive

                      </span>

                    }


                  </td>



                  <td className="px-4 py-3">


                    <div className="flex flex-wrap gap-2">


                      <button

                        className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"

                        onClick={()=>startEdit(student)}

                      >

                        Edit

                      </button>



                      <button

                        className="rounded-lg bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"

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

                        className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"

                        onClick={()=>deleteStudent(student._id)}

                      >

                        Delete

                      </button>


                    </div>


                  </td>



                </tr>

              ))

            }


          </tbody>


        </table>


      </div>





      {/* Pagination */}


      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


        <div>


          <small className="text-slate-500">

            Showing

            <span className="mx-1 font-semibold">

              {students.length}

            </span>

            of

            <span className="mx-1 font-semibold">

              {totalStudents}

            </span>

            students

          </small>


        </div>





        <div className="flex items-center gap-2">


          <button

            disabled={page === 1}

            onClick={()=>setPage(page-1)}

            className="rounded-lg border px-3 py-2 disabled:opacity-50"

          >

            Previous

          </button>



          {
            [...Array(totalPages)].map((_,index)=>(


              <button

                key={index}

                onClick={()=>setPage(index+1)}

                className={

                  `rounded-lg px-3 py-2 

                  ${
                    page === index + 1

                    ?

                    "bg-blue-600 text-white"

                    :

                    "border"

                  }`

                }

              >

                {index+1}

              </button>


            ))
          }



          <button

            disabled={page === totalPages}

            onClick={()=>setPage(page+1)}

            className="rounded-lg border px-3 py-2 disabled:opacity-50"

          >

            Next

          </button>


        </div>





        <div className="flex items-center gap-2">


          <span className="text-sm text-slate-600">

            Rows

          </span>



          <select

            className="rounded-lg border px-3 py-2"

            value={limit}

            onChange={(e)=>{

              setLimit(Number(e.target.value));

              setPage(1);

            }}

          >

            <option value="10">
              10
            </option>

            <option value="25">
              25
            </option>

            <option value="50">
              50
            </option>

            <option value="100">
              100
            </option>


          </select>


        </div>


      </div>


    </div>

  );

};


export default Students;

// pages: Students.jsx
import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AdminAuthContext } from "../context/AdminAuthContext";
import DataTable from "../components/DataTable";

const Students = () => {

  const { adminToken } = useContext(AdminAuthContext);

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

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

    } catch (error) {

      console.error(error);

    }

  };

  const filteredStudents = students.filter(student => {

    const searchText = search.toLowerCase();

    return (
      student.fullName.toLowerCase().includes(searchText) ||
      student.studentId.toLowerCase().includes(searchText)
    );

  });

  return (

    <div>

      <h2>Students</h2>
      
      <p>
        Total Students: {filteredStudents.length}
      </p>

      <input
        className="form-control mb-3"
        placeholder="Search by name or student ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataTable

      columns={[
        {
          key:"studentId",
          label:"Student ID"
        },

        {
          key:"fullName",
          label:"Name"
        },

        {
          key:"year",
          label:"Year"
        },

        {
          key:"semester",
          label:"Semester"
        },

        {
          key:"isActive",
          label:"Status",

          render:(student)=>(

            student.isActive
            ? "Active"
            : "Inactive"

          )

        }

      ]}

      data={filteredStudents}

      />

    </div>

  );

};

export default Students;
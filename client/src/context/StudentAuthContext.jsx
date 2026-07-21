/**
 * ==========================================================
 * context/StudentAuthContext.jsx
 * ----------------------------------------------------------
 * Stores student authentication state.
 * ==========================================================
 */

import { createContext, useState } from "react";

export const StudentAuthContext = createContext();

export const StudentAuthProvider = ({ children }) => {

  const [student, setStudent] = useState(
    JSON.parse(localStorage.getItem("student")) || null
  );

  const [studentToken, setStudentToken] = useState(
    localStorage.getItem("studentToken") || null
  );

  const loginStudent = (studentData, token) => {

    setStudent(studentData);
    setStudentToken(token);

    localStorage.setItem(
      "student",
      JSON.stringify(studentData)
    );

    localStorage.setItem(
      "studentToken",
      token
    );

  };

  const logoutStudent = () => {

    setStudent(null);
    setStudentToken(null);

    localStorage.removeItem("student");
    localStorage.removeItem("studentToken");

  };

  return (

    <StudentAuthContext.Provider
      value={{
        student,
        studentToken,
        loginStudent,
        logoutStudent
      }}
    >

      {children}

    </StudentAuthContext.Provider>

  );

};
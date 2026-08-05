/**
 * ==========================================================
 * File: controllers/authController.js
 * ----------------------------------------------------------
 * Handles authentication requests.
 *
 * Features:
 * - Student login
 * - Admin login
 * - Student portal activity tracking
 * ==========================================================
 */


const asyncHandler =
require("../middleware/asyncHandler");


const authService =
require("../services/authService");


const createStudentActivity =
require("../utils/createStudentActivity");



// ==========================================================
// Student Login
//
// POST /api/auth/student/login
// ==========================================================

const studentLogin =
asyncHandler(async(req,res)=>{


  const {
    studentId,
    fullName

  } = req.body;



  const result =
  await authService.studentLogin(
    studentId,
    fullName
  );



  // ==========================================================
  // Student Activity Log
  //
  // Records successful student login
  // ==========================================================

  await createStudentActivity({

    student:
    result.student._id,

    action:
    "LOGIN",

    description:
    "Student logged into portal"

  });



  res.status(200).json({

    success:true,

    message:
    "Student login successful",

    data:
    result

  });


});



// ==========================================================
// Admin Login
//
// POST /api/auth/admin/login
// ==========================================================

const adminLogin =
asyncHandler(async(req,res)=>{


  const {
    email,
    password

  } = req.body;



  const result =
  await authService.adminLogin(
    email,
    password
  );



  res.status(200).json({

    success:true,

    message:
    "Admin login successful",

    data:
    result

  });


});



module.exports = {

  studentLogin,

  adminLogin

};
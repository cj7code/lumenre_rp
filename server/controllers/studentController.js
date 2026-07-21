/**
 * ==========================================================
 * controllers/studentController.js
 * ==========================================================
 */

const Student = require("../models/Student");
const asyncHandler = require("../middleware/asyncHandler");
const studentService = require("../services/studentService");

//Create Student
const createStudent = asyncHandler(async (req, res) => {

  const student = await studentService.createStudent(req.body);

  res.status(201).json({

    success: true,

    message: "Student created successfully.",

    data: student,

  });

});

// Get All Students
const getStudents = asyncHandler(async (req, res) => {

  const students = await studentService.getStudents();

  res.status(200).json({

    success: true,

    count: students.length,

    data: students,

  });

});

/**
 * ==========================================================
 * Admin: Get all students
 * GET /api/students/admin/all
 * ==========================================================
 */

const getAllStudentsForAdmin = asyncHandler(async (req, res) => {

  const students = await Student.find()
    .sort({ fullName: 1 });

  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });

});

// Get Student

const getStudent = asyncHandler(async (req, res) => {

  const student = await studentService.getStudentById(
    req.params.id
  );

  res.status(200).json({

    success: true,

    data: student,

  });

});

//Update Student
const updateStudent = asyncHandler(async (req, res) => {

  const student = await studentService.updateStudent(
    req.params.id,
    req.body
  );

  res.status(200).json({

    success: true,

    message: "Student updated successfully.",

    data: student,

  });

});

// Delete Student
const deleteStudent = asyncHandler(async (req, res) => {

  await studentService.deleteStudent(req.params.id);

  res.status(200).json({

    success: true,

    message: "Student deleted successfully.",

  });

});

module.exports = {

  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  getAllStudentsForAdmin

};
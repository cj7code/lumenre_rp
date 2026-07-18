/**
 * ==========================================================
 * controllers/studentController.js
 * ----------------------------------------------------------
 * Handles all business logic related to students.
 * ==========================================================
 */

const Student = require("../models/Student");
const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/AppError");

/**
 * ----------------------------------------------------------
 * Create a new student
 * POST /api/students
 * ----------------------------------------------------------
 */
const createStudent = asyncHandler(async (req, res) => {
  // Check if a student with the same Student ID already exists
  const existingStudent = await Student.findOne({
    studentId: req.body.studentId,
  });

  if (existingStudent) {
    throw new AppError("Student ID already exists.", 400);
  }

  // Create the student
  const student = await Student.create(req.body);

  res.status(201).json({
    success: true,
    message: "Student created successfully.",
    data: student,
  });
});

/**
 * ----------------------------------------------------------
 * Get all students
 * GET /api/students
 * ----------------------------------------------------------
 */
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find().sort({
    fullName: 1,
  });

  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

/**
 * ----------------------------------------------------------
 * Get one student
 * GET /api/students/:id
 * ----------------------------------------------------------
 */
const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});

/**
 * ----------------------------------------------------------
 * Update student
 * PUT /api/students/:id
 * ----------------------------------------------------------
 */
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    data: student,
  });
});

/**
 * ----------------------------------------------------------
 * Delete student
 * DELETE /api/students/:id
 * ----------------------------------------------------------
 */
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Student deleted successfully.",
  });
});

/**
 * ==========================================================
 * Export Controller Functions
 * ==========================================================
 */
module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
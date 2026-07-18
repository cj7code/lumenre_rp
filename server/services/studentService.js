/**
 * ==========================================================
 * services/studentService.js
 * ----------------------------------------------------------
 * Handles all business logic related to students.
 * Controllers should NEVER communicate directly
 * with the database.
 * ==========================================================
 */

const Student = require("../models/Student");
const AppError = require("../utils/AppError");

/**
 * Create a student
 */
const createStudent = async (studentData) => {
  // Check for duplicate Student ID
  const existingStudent = await Student.findOne({
    studentId: studentData.studentId,
  });

  if (existingStudent) {
    throw new AppError("Student ID already exists.", 400);
  }

  return await Student.create(studentData);
};

/**
 * Get all students
 */
const getStudents = async () => {
  return await Student.find().sort({
    fullName: 1,
  });
};

/**
 * Get one student
 */
const getStudentById = async (id) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  return student;
};

/**
 * Update student
 */
const updateStudent = async (id, data) => {
  const student = await Student.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  return student;
};

/**
 * Delete student
 */
const deleteStudent = async (id) => {
  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  return student;
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
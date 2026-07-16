/**
 * ==========================================================
 * controllers/studentController.js
 * ----------------------------------------------------------
 * Handles all business logic related to students.
 * ==========================================================
 */

const Student = require("../models/Student");

/**
 * ----------------------------------------------------------
 * Create a new student
 * POST /api/students
 * ----------------------------------------------------------
 */
const createStudent = async (req, res) => {
  try {
    // Create a new student using the request body
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully.",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ----------------------------------------------------------
 * Get all students
 * GET /api/students
 * ----------------------------------------------------------
 */
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ fullName: 1 });

    res.json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ----------------------------------------------------------
 * Get one student
 * GET /api/students/:id
 * ----------------------------------------------------------
 */
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ----------------------------------------------------------
 * Update student
 * PUT /api/students/:id
 * ----------------------------------------------------------
 */
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.json({
      success: true,
      message: "Student updated successfully.",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ----------------------------------------------------------
 * Delete student
 * DELETE /api/students/:id
 * ----------------------------------------------------------
 */
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.json({
      success: true,
      message: "Student deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Export all controller functions
module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
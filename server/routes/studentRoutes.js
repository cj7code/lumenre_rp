/**
 * ==========================================================
 * routes/studentRoutes.js
 * ----------------------------------------------------------
 * Defines all routes related to students.
 * ==========================================================
 */

const express = require("express");
const router = express.Router();

// Import controller functions
const {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Create student
router.post("/", createStudent);

// Get all students
router.get("/", getStudents);

// Get one student
router.get("/:id", getStudent);

// Update student
router.put("/:id", updateStudent);

// Delete student
router.delete("/:id", deleteStudent);

module.exports = router;
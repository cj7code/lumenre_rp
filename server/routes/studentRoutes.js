/**
 * ==========================================================
 * routes/studentRoutes.js
 * ----------------------------------------------------------
 * Defines all routes related to students.
 * ==========================================================
 */

const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  getAllStudentsForAdmin,
  toggleStudentStatus,
  bulkUpdateStatus,
  bulkDeleteStudents,
  restoreStudent
} = require("../controllers/studentController");

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

// ==========================================================
// Admin student management routes
// ==========================================================

// Create student
router.post("/", protect, authorize("admin"), createStudent);

// Get all students for admin
router.get("/admin/all", protect, authorize("admin"), getAllStudentsForAdmin);

// Update student
router.put("/:id", protect, authorize("admin"), updateStudent);

// Activate / deactivate student
router.patch("/:id/status", protect, authorize("admin"), toggleStudentStatus);

// Delete student
router.delete("/:id", protect, authorize("admin"), deleteStudent);

// ==========================================================
// General student routes
// ==========================================================

// Student list
router.get("/", getStudents);

// Get one student
router.get("/:id", getStudent);

// Bulk activate/deactivate students
router.patch(
  "/bulk/status",
  protect,
  authorize("admin"),
  bulkUpdateStatus
);


// Bulk delete students
router.delete(
  "/bulk/delete",
  protect,
  authorize("admin"),
  bulkDeleteStudents
);

// Restore deleted student
router.patch(
  "/:id/restore",
  protect,
  authorize("admin"),
  restoreStudent
);

module.exports = router;
/**
 * ==========================================================
 * routes/bulkStudentRoutes.js
 * ----------------------------------------------------------
 * Routes for bulk student import.
 * ==========================================================
 */

const express = require("express");
const router = express.Router();

const excelUpload = require("../middleware/excelUpload");

const {
  importStudents
} = require("../controllers/bulkStudentController");

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

router.post(
  "/import",
  protect,
  authorize("admin"),
  excelUpload.single("file"),
  importStudents
);

module.exports = router;
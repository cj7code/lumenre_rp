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
  importStudents,
  exportStudents
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

router.get(
  "/export",
  protect,
  authorize("admin"),
  exportStudents
);
module.exports = router;
/**
 * ==========================================================
 * File: routes/resultSlipRoutes.js
 * ----------------------------------------------------------
 * Routes for uploading student PDF result slips.
 * ==========================================================
 */

const express = require("express");
const router = express.Router();

const pdfUpload = require("../middleware/pdfUpload");

const {
  uploadResultSlip,
  getMyResultSlips
} = require("../controllers/resultSlipController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.post(
  "/upload",
  protect,
  authorize("admin"),
  pdfUpload.single("file"),
  uploadResultSlip
);

router.get(
  "/my-results",
  protect,
  authorize("student"),
  getMyResultSlips
);

module.exports = router;
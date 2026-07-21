/**
 * ==========================================================
 * File: routes/resultSlipRoutes.js
 * ----------------------------------------------------------
 * Handles all student result slip operations.
 *
 * Features:
 * - Admin PDF upload
 * - Admin viewing uploaded slips
 * - Result release
 * - Result deletion
 * - Student result retrieval
 * ==========================================================
 */


const express = require("express");

const router = express.Router();


// ==========================================================
// Middleware
// ==========================================================

const pdfUpload =
require("../middleware/pdfUpload");

const {
  protect,
  authorize
} =
require("../middleware/authMiddleware");


// ==========================================================
// Controllers
// ==========================================================

const {
  uploadResultSlip,
  getMyResultSlips,
  getAllResultSlips,
  releaseResultSlip,
  deleteResultSlip

} =
require("../controllers/resultSlipController");



// ==========================================================
// ADMIN ROUTES
// ==========================================================


/**
 * Upload PDF result slip
 *
 * POST /api/result-slips/upload
 *
 * Access:
 * Admin only
 */

router.post(
  "/upload",

  protect,

  authorize("admin"),

  pdfUpload.single("file"),

  uploadResultSlip
);



/**
 * Get all uploaded result slips
 *
 * GET /api/result-slips/admin/all
 *
 * Access:
 * Admin only
 */

router.get(
  "/admin/all",

  protect,

  authorize("admin"),

  getAllResultSlips
);



/**
 * Release result slip
 *
 * PATCH /api/result-slips/:id/release
 *
 * Access:
 * Admin only
 */

router.patch(
  "/:id/release",

  protect,

  authorize("admin"),

  releaseResultSlip
);



/**
 * Delete result slip
 *
 * DELETE /api/result-slips/:id
 *
 * Access:
 * Admin only
 */

router.delete(
  "/:id",

  protect,

  authorize("admin"),

  deleteResultSlip
);



// ==========================================================
// STUDENT ROUTES
// ==========================================================


/**
 * Student retrieves released results
 *
 * GET /api/result-slips/my-results
 *
 * Access:
 * Student only
 */

router.get(
  "/my-results",

  protect,

  authorize("student"),

  getMyResultSlips
);



module.exports = router;
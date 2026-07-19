/**
 * ==========================================================
 * File: routes/resultRoutes.js
 * ----------------------------------------------------------
 * Routes related to student results.
 * ==========================================================
 */

const express = require("express");
const router = express.Router();

const {
  getMyResults,
} = require("../controllers/resultController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");


//Student views own results
router.get(
  "/my-results",
  protect,
  authorize("student"),
  getMyResults
);


module.exports = router;
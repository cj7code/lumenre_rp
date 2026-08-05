/**
 * ==========================================================
 * routes/studentActivityRoutes.js
 * ----------------------------------------------------------
 * Student activity routes.
 * ==========================================================
 */

const express =
require("express");

const router =
express.Router();

const {
  getStudentActivities
}=
require("../controllers/studentActivityController");

const {
  protect,
  authorize
}=
require("../middleware/authMiddleware");

router.get(
  "/",
  protect,
  authorize("admin"),
  getStudentActivities
);

module.exports =
router;
/**
 * ==========================================================
 * File: controllers/resultController.js
 * ----------------------------------------------------------
 * Handles HTTP requests related to results.
 * ==========================================================
 */

const asyncHandler = require("../middleware/asyncHandler");
const resultService = require("../services/resultService");

/**
 * ----------------------------------------------------------
 * Get logged-in student's results
 *
 * GET /api/results/my-results
 * ----------------------------------------------------------
 */

const getMyResults = asyncHandler(async (req, res) => {

  const results = await resultService.getStudentResults(
    req.user.id
  );


  res.status(200).json({
    success: true,
    count: results.length,
    data: results,

  });

});


module.exports = {
  getMyResults,
};
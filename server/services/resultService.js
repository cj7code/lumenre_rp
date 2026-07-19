/**
 * ==========================================================
 * services/resultService.js
 * ----------------------------------------------------------
 * Handles all business logic related to results.
 * Controllers should not directly communicate with MongoDB.
 * ==========================================================
 */

const Result = require("../models/Result");
const Payment = require("../models/Payment");
const AppError = require("../utils/AppError");


/**
 * ----------------------------------------------------------
 * Get student's results
 *
 * Rules:
 * 1. Student must exist
 * 2. Student must be fully paid
 * 3. Only released results are returned
 * ----------------------------------------------------------
 */

const getStudentResults = async (studentId) => {

  // Check student's payment status
  const payment = await Payment.findOne({
    student: studentId,
  });


  if (!payment || !payment.fullyPaid) {

    throw new AppError(
      "Results are locked. Please clear your outstanding fees.",
      403
    );

  }


  // Get released results
  const results = await Result.find({
    student: studentId,
  })
    .populate("course")
    .sort({
      academicYear: 1,
      year: 1,
      semester: 1,
    });


  return results;

};


module.exports = {
  getStudentResults,
};
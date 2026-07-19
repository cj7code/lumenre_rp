/**
 * ==========================================================
 * controllers/resultSlipController.js
 * ----------------------------------------------------------
 * Uploads and manages student result slips.
 * ==========================================================
 */

const fs = require("fs");
const ResultSlip = require("../models/ResultSlip");
const asyncHandler = require("../middleware/asyncHandler");


const uploadResultSlip = asyncHandler(async (req, res) => {

  const {
    student,
    academicYear,
    year,
    semester
  } = req.body;

  if (!req.file) {

    return res.status(400).json({
      success: false,
      message: "Please upload a PDF result slip."
    });

  }

  /**
 * ----------------------------------------------------------
 * Student views released result slips
 * GET /api/result-slips/my-results
 * ----------------------------------------------------------
 */

const Payment = require("../models/Payment");

const getMyResultSlips = asyncHandler(async (req, res) => {

  const payment = await Payment.findOne({
    student: req.user.id
  });

  if (!payment || !payment.fullyPaid) {

    return res.status(403).json({
      success: false,
      status: "fail",
      message: "Results are locked. Please clear your outstanding fees."
    });

  }

  const resultSlips = await ResultSlip.find({
    student: req.user.id,
    released: true
  }).sort({
    year: 1,
    semester: 1
  });

  res.status(200).json({

    success: true,
    count: resultSlips.length,
    data: resultSlips

  });

});
  
const existingSlip = await ResultSlip.findOne({
    student,
    academicYear,
    year,
    semester
  });

  if (existingSlip) {

    if (fs.existsSync(existingSlip.filePath)) {
      fs.unlinkSync(existingSlip.filePath);
    }

    existingSlip.filePath = req.file.path;

    existingSlip.released = false;

    await existingSlip.save();

    return res.status(200).json({
      success: true,
      message: "Existing result slip replaced successfully.",
      data: existingSlip
    });

  }

  const resultSlip = await ResultSlip.create({

    student,
    academicYear,
    year,
    semester,
    filePath: req.file.path

  });

  res.status(201).json({

    success: true,
    message: "Result slip uploaded successfully.",
    data: resultSlip

  });

});

/**
 * ----------------------------------------------------------
 * Release a student's result slip
 * PATCH /api/result-slips/:id/release
 * ----------------------------------------------------------
 */

const releaseResultSlip = asyncHandler(async (req, res) => {

  const resultSlip = await ResultSlip.findById(req.params.id);

  if (!resultSlip) {

    return res.status(404).json({
      success: false,
      message: "Result slip not found."
    });

  }

  resultSlip.released = true;

  await resultSlip.save();

  res.status(200).json({

    success: true,
    message: "Result released successfully.",
    data: resultSlip

  });

});


module.exports = {
  uploadResultSlip,
  getMyResultSlips,
  releaseResultSlip
};
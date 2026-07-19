/**
 * ==========================================================
 * controllers/resultSlipController.js
 * ----------------------------------------------------------
 * Handles uploading, releasing, and student access
 * of PDF result slips.
 * ==========================================================
 */

const fs = require("fs");

const ResultSlip = require("../models/ResultSlip");
const Payment = require("../models/Payment");
const asyncHandler = require("../middleware/asyncHandler");


/**
 * ----------------------------------------------------------
 * Upload or replace a student result slip
 * POST /api/result-slips/upload
 * ----------------------------------------------------------
 */
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


  // Check if this student already has this result slip
  const existingSlip = await ResultSlip.findOne({

    student,
    academicYear,
    year,
    semester

  });


  // Delete old PDF if replacing
  if (existingSlip && existingSlip.filePath) {

    if (fs.existsSync(existingSlip.filePath)) {

      fs.unlinkSync(existingSlip.filePath);

    }

  }


  // Create new or update existing result slip
  const resultSlip = await ResultSlip.findOneAndUpdate(

    {
      student,
      academicYear,
      year,
      semester
    },

    {
      student,
      academicYear,
      year,
      semester,
      filePath: req.file.path,

      // New uploads must be released again
      released: false
    },

    {
      new: true,
      upsert: true,
      runValidators: true
    }

  );


  res.status(200).json({

    success: true,
    message: "Result slip uploaded successfully.",
    data: resultSlip

  });

});



/**
 * ----------------------------------------------------------
 * Student views released result slips
 * GET /api/result-slips/my-results
 * ----------------------------------------------------------
 */
const getMyResultSlips = asyncHandler(async (req, res) => {


  // Check student payment status
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


  // Find released results belonging to logged-in student
  const resultSlips = await ResultSlip.find({

    student: req.user.id,
    released: true

  })
  .sort({

    year: 1,
    semester: 1

  });



  const results = resultSlips.map((slip) => ({


    id: slip._id,
    academicYear: slip.academicYear,
    year: slip.year,
    semester: slip.semester,
    released: slip.released,

    downloadUrl:
    `${req.protocol}://${req.get("host")}/${slip.filePath.replace(/\\/g, "/")}`


  }));


  res.status(200).json({

    success: true,
    count: results.length,
    data: results

  });


});



/**
 * ----------------------------------------------------------
 * Release a student's result slip
 * PATCH /api/result-slips/:id/release
 * ----------------------------------------------------------
 */
const releaseResultSlip = asyncHandler(async (req, res) => {


  const resultSlip =
  await ResultSlip.findById(req.params.id);



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
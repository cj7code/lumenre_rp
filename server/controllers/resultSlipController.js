/**
 * ==========================================================
 * File: controllers/resultSlipController.js
 * ----------------------------------------------------------
 * Handles all result slip operations:
 *
 * - Upload PDF result slips
 * - Replace existing slips
 * - Admin view all slips
 * - Release results
 * - Delete slips
 * - Student access to released results
 * ==========================================================
 */

const fs = require("fs");

const ResultSlip = require("../models/ResultSlip");
const Student = require("../models/Student");
const Payment = require("../models/Payment");

const asyncHandler =
require("../middleware/asyncHandler");

// ==========================================================
// Upload Result Slip
//
// POST /api/result-slips/upload
//
// Admin only
// ==========================================================

const uploadResultSlip = asyncHandler(
async (req,res)=>{


  const {
    student,
    academicYear,
    year,
    semester
  } = req.body;

  // Check PDF file
  if(!req.file){

    return res.status(400).json({

      success:false,
      message:
      "Please upload a PDF result slip."

    });

  }


  // Verify student exists
  const studentRecord =
  await Student.findById(student);

  if(!studentRecord){

    return res.status(404).json({

      success:false,
      message:
      "Student not found."

    });

  }

  // Check existing result slip
  const existingSlip =
  await ResultSlip.findOne({

    student,
    academicYear,
    year,

    semester

  });


  // Delete previous PDF
  if(
    existingSlip &&
    existingSlip.filePath
  ){

    if(
      fs.existsSync(
        existingSlip.filePath
      )
    ){

      fs.unlinkSync(
        existingSlip.filePath
      );

    }

  }

  // Create or update record
  const resultSlip =
  await ResultSlip.findOneAndUpdate(

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

      filePath: `uploads/results/${req.file.filename}`,

      released:false

    },


    {

      new:true,

      upsert:true,

      runValidators:true

    }

  );



  res.status(201).json({

    success:true,
    message:
    "Result slip uploaded successfully.",
    data:resultSlip

  });


});

// ==========================================================
// Student View Results
//
// GET /api/result-slips/my-results
//
// Student only
// ==========================================================


const getMyResultSlips =
asyncHandler(async(req,res)=>{


  const payment =
  await Payment.findOne({

    student:req.user.id

  });



  if(
    !payment ||
    !payment.fullyPaid
  ){

    return res.status(403).json({

      success:false,
      status:"fail",
      message:
      "Results are locked. Please clear your outstanding fees."

    });

  }



  const resultSlips =
  await ResultSlip.find({

    student:req.user.id,
    released:true

  })
  .sort({

    year:1,
    semester:1

  });



  const results =
  resultSlips.map((slip)=>({

    id:slip._id,

    academicYear:
    slip.academicYear,

    year:
    slip.year,

    semester:
    slip.semester,


    downloadUrl:

    `${req.protocol}://${req.get("host")}/${slip.filePath.replace(/\\/g,"/")}`


  }));



  res.status(200).json({

    success:true,
    count:results.length,
    data:results

  });


});

// ==========================================================
// Admin View All Result Slips
//
// GET /api/result-slips/admin/all
//
// ==========================================================

const getAllResultSlips =
asyncHandler(async(req,res)=>{


  const slips =
  await ResultSlip.find()

  .populate(
    "student",
    "fullName studentId year semester"
  )

  .sort({

    createdAt:-1

  });



  res.status(200).json({

    success:true,

    count:slips.length,

    data:slips

  });


});

// ==========================================================
// Release Result Slip
//
// PATCH /api/result-slips/:id/release
//
// ==========================================================

const releaseResultSlip =
asyncHandler(async(req,res)=>{

  const resultSlip =
  await ResultSlip.findById(
    req.params.id
  );


  if(!resultSlip){

    return res.status(404).json({

      success:false,

      message:
      "Result slip not found."

    });

  }

  // Check student payment
  const payment =
  await Payment.findOne({

    student:
    resultSlip.student

  });



  if(
    !payment ||
    !payment.fullyPaid
  ){

    return res.status(403).json({

      success:false,
      message:
      "Cannot release result. Student has outstanding fees."

    });

  }


  resultSlip.released=true;

  await resultSlip.save();

  res.status(200).json({

    success:true,
    message:
    "Result released successfully.",

    data:resultSlip

  });


});





// ==========================================================
// Delete Result Slip
//
// DELETE /api/result-slips/:id
//
// ==========================================================


const deleteResultSlip =
asyncHandler(async(req,res)=>{


  const resultSlip =
  await ResultSlip.findById(
    req.params.id
  );


  if(!resultSlip){

    return res.status(404).json({

      success:false,

      message:
      "Result slip not found."

    });

  }

  if(
    resultSlip.filePath &&
    fs.existsSync(
      resultSlip.filePath
    )
  ){

    fs.unlinkSync(
      resultSlip.filePath
    );

  }

  await resultSlip.deleteOne();

  res.status(200).json({

    success:true,
    message:
    "Result slip deleted successfully."

  });


});

/**
 * ==========================================================
 * Admin Dashboard Statistics
 * GET /api/result-slips/dashboard
 * ==========================================================
 */

const getDashboardStats = asyncHandler(async (req, res) => {

  const totalStudents = await Student.countDocuments();

  const uploadedResults = await ResultSlip.countDocuments();

  const releasedResults = await ResultSlip.countDocuments({
    released: true
  });

  const pendingResults = await ResultSlip.countDocuments({
    released: false
  });

  res.status(200).json({
    success: true,
    data: {
      totalStudents,
      uploadedResults,
      releasedResults,
      pendingResults
    }
  });

});

/**
 * ==========================================================
 * Admin: Recent Result Slip Uploads
 * GET /api/result-slips/recent
 * ==========================================================
 */

const getRecentUploads = asyncHandler(async (req, res) => {

  const uploads = await ResultSlip.find()
    .populate(
      "student",
      "fullName studentId"
    )
    .sort({
      createdAt: -1
    })
    .limit(5);

  res.status(200).json({

    success: true,
    data: uploads

  });

});

module.exports = {

  uploadResultSlip,
  getMyResultSlips,
  getAllResultSlips,
  releaseResultSlip,
  deleteResultSlip,
  getDashboardStats,
  getRecentUploads

};
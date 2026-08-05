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
 * - Lock results
 * - Delete slips
 * - Student access to released results
 * ==========================================================
 */


const fs = require("fs");


const ResultSlip =
require("../models/ResultSlip");


const Student =
require("../models/Student");

const createStudentActivity =
require("../utils/createStudentActivity");

const createAudit =
require("../utils/createAudit");


const asyncHandler =
require("../middleware/asyncHandler");


// ==========================================================
// Upload Result Slip
//
// POST /api/result-slips/upload
//
// Admin only
// ==========================================================


const uploadResultSlip =
asyncHandler(async(req,res)=>{


  const {
    student,
    academicYear,
    year,
    semester

  } = req.body;


  // Check PDF upload

  if(!req.file){
    console.log(
      "Uploaded file:",
      req.file
    );

    return res.status(400).json({

      success:false,

      message:
      "Please upload a PDF result slip."

    });

  }

  // Confirm student exists

  const studentRecord =
  await Student.findById(student);



  if(!studentRecord){

    return res.status(404).json({

      success:false,

      message:
      "Student not found."

    });

  }


  // Check previous result

  const existingSlip =
  await ResultSlip.findOne({

    student,

    academicYear,

    year,

    semester

  });

  // Remove old PDF if replacing

  if(

    existingSlip &&
    existingSlip.filePath &&
    fs.existsSync(existingSlip.filePath)

  ){

    fs.unlinkSync(existingSlip.filePath);

  }

  // Create/update result record

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


      filePath:

      `uploads/results/${req.file.filename}`,


      // Keep previous release status

      released:

      existingSlip

      ?

      existingSlip.released

      :

      false

    },


    {

      returnDocument:"after",
      upsert:true,
      runValidators:true

    }

  );

  // ========================================================
  // Audit Log
  // ========================================================

  try {

    await createAudit({

      admin:
      req.user?.id,

      action:
      "UPLOAD_RESULT",

      description:
      `Uploaded result slip for ${studentRecord.fullName}`,

      targetId:
      resultSlip._id

    });

  }
  catch(error){

    console.log(
      "Audit creation failed:",
      error.message
    );

  }


  res.status(201).json({

    success:true,

    message:
    "Result slip uploaded successfully.",

    data:resultSlip

  });


});


// ==========================================================
// Student Get Results
// GET /api/result-slips/my-results
// ==========================================================


const getMyResultSlips =
asyncHandler(async(req,res)=>{


  const studentId =

  req.user?.id ||

  req.student?._id;


  if(!studentId){

    return res.status(401).json({

      success:false,

      message:
      "Student authentication required."

    });

  }

  // ==========================================================
  // Student Activity
  // ==========================================================

  await createStudentActivity({

    student:studentId,

    action:"VIEW_PORTAL",

    description:
    "Opened results dashboard"

  });


  const resultSlips =

  await ResultSlip.find({

    student:studentId

  })

  .sort({

    year:1,

    semester:1

  });



  const results =

  resultSlips.map((slip)=>({


    _id:slip._id,


    academicYear:
    slip.academicYear,


    year:
    slip.year,


    semester:
    slip.semester,


    released:
    slip.released,


    createdAt:
    slip.createdAt,


    downloadUrl:

    `${process.env.SERVER_URL}/${slip.filePath.replace(/\\/g,"/")}`


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


/**
 * ==========================================================
 * Release Result Slip
 *
 * PATCH /api/result-slips/:id/release
 *
 * Admin manually releases results.
 * ==========================================================
 */

const releaseResultSlip = asyncHandler(async(req,res)=>{

  const resultSlip =
  await ResultSlip.findById(req.params.id);


  if(!resultSlip){

    return res.status(404).json({

      success:false,

      message:"Result slip not found."

    });

  }


  resultSlip.released = true;

  await resultSlip.save();


// Create audit record
const studentRecord =
await Student.findById(
  resultSlip.student
);


await createAudit({

  admin:req.user?.id,

  action:"RELEASE_RESULT",

  description:
  `Released result slip for ${studentRecord.fullName}`,

  targetId:
  resultSlip._id

});


  res.status(200).json({

    success:true,

    message:
    "Result released successfully.",

    data:resultSlip

  });


});

// ==========================================================
// Lock Result Slip
// PATCH /api/result-slips/:id/lock
// ==========================================================

const lockResultSlip =
asyncHandler(async(req,res)=>{

  const slip =
  await ResultSlip.findByIdAndUpdate(

    req.params.id,

    {
      released:false
    },

    {
      new:true
    }

  );


  if(!slip){

    return res.status(404).json({

      success:false,

      message:"Result slip not found."

    });

  }


  // Audit

  const studentRecord =
  await Student.findById(
    slip.student
  );


  await createAudit({

    admin:req.user?.id,

    action:"LOCK_RESULT",

    description:
    `Locked result slip for ${studentRecord.fullName}`,

    targetId:slip._id

  });


  res.status(200).json({

    success:true,

    message:"Result slip locked successfully.",

    data:slip

  });

});

// ==========================================================
// Delete Result Slip
// DELETE /api/result-slips/:id
// ==========================================================

const deleteResultSlip =
asyncHandler(async(req,res)=>{

  const resultSlip =
  await ResultSlip.findById(req.params.id);


  if(!resultSlip){

    return res.status(404).json({

      success:false,

      message:"Result slip not found."

    });

  }

  // Delete physical PDF
  if(

    resultSlip.filePath &&
    fs.existsSync(resultSlip.filePath)

  ){

    fs.unlinkSync(resultSlip.filePath);

  }


  await resultSlip.deleteOne();

  // Audit
  const studentRecord =
  await Student.findById(
    resultSlip.student
  );

  await createAudit({

    admin:req.user?.id,

    action:"DELETE_RESULT",

    description:
    `Deleted result slip for ${studentRecord.fullName}`,

    targetId:resultSlip._id

  });


  res.status(200).json({

    success:true,

    message:"Result slip deleted successfully."

  });

});

// ==========================================================
// Admin Dashboard Statistics
// GET /api/result-slips/dashboard
// ==========================================================

const getDashboardStats =
asyncHandler(async(req,res)=>{

  const totalStudents =
  await Student.countDocuments();

  const uploadedResults =
  await ResultSlip.countDocuments();

  const releasedResults =
  await ResultSlip.countDocuments({

    released:true

  });


  const pendingResults =
  await ResultSlip.countDocuments({

    released:false

  });


  res.status(200).json({

    success:true,

    data:{

      totalStudents,
      uploadedResults,
      releasedResults,
      pendingResults

    }

  });

});

// ==========================================================
// Admin Recent Result Uploads
// GET /api/result-slips/recent
// ==========================================================

const getRecentUploads =
asyncHandler(async(req,res)=>{

  const uploads =
  await ResultSlip.find()

  .populate(

    "student",

    "fullName studentId"

  )

  .sort({

    createdAt:-1

  })

  .limit(5);


  res.status(200).json({

    success:true,

    data:uploads

  });

});

// ==========================================================
// Export Controller Functions
// ==========================================================

module.exports = {

  uploadResultSlip,
  getMyResultSlips,
  getAllResultSlips,
  releaseResultSlip,
  lockResultSlip,
  deleteResultSlip,
  getDashboardStats,
  getRecentUploads

};
/**
 * ==========================================================
 * File: middleware/pdfUpload.js
 * ----------------------------------------------------------
 * Handles PDF uploads for student result slips.
 *
 * Responsibilities:
 * - Create upload folder if missing
 * - Store PDF files safely
 * - Generate professional filenames
 * - Validate PDF format
 * - Limit upload size
 * ==========================================================
 */


const multer = require("multer");
const path = require("path");
const fs = require("fs");


// ==========================================================
// Upload Folder
// ==========================================================

const uploadDirectory =
path.join(
  __dirname,
  "../uploads/results"
);


// Create folder automatically if it does not exist

if (!fs.existsSync(uploadDirectory)) {

  fs.mkdirSync(
    uploadDirectory,
    {
      recursive:true
    }
  );

}



// ==========================================================
// Storage Configuration
// ==========================================================

const storage = multer.diskStorage({

  destination:(req,file,cb)=>{

    cb(
      null,
      uploadDirectory
    );

  },


  filename: async (req, file, cb) => {

  const Student = require("../models/Student");

  try {

    const student = await Student.findById(
      req.body.student
    );


    const studentId =
      student ? student.studentId : "unknown";


    const {
      year,
      semester,
      academicYear
    } = req.body;


    const extension =
      path.extname(file.originalname);


    const fileName =
      `${studentId}_Y${year}_S${semester}_${academicYear}${extension}`;


    cb(null, fileName);


  } catch(error) {

    cb(error);

  }

}

});



// ==========================================================
// File Validation
// ==========================================================

const fileFilter = (req,file,cb)=>{


  if(
    file.mimetype === "application/pdf"
  ){

    cb(
      null,
      true
    );

  }
  else{

    cb(
      new Error(
        "Only PDF files are allowed."
      ),
      false
    );

  }

};



// ==========================================================
// Multer Configuration
// ==========================================================

const pdfUpload = multer({

  storage,

  fileFilter,


  limits:{

    // Maximum file size: 5MB

    fileSize:
    5 * 1024 * 1024

  }

});



module.exports = pdfUpload;
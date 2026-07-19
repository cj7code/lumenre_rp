/**
 * ==========================================================
 * middleware/pdfUpload.js
 * ----------------------------------------------------------
 * Handles PDF uploads for result slips.
 * ==========================================================
 */

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/results");
  },

  filename: (req, file, cb) => {

    const {
      studentId,
      year,
      semester,
      academicYear
    } = req.body;

    const extension = path.extname(file.originalname);

    const fileName =
      `${studentId}_Y${year}_S${semester}_${academicYear}${extension}`;

    cb(null, fileName);
  }

});

const pdfUpload = multer({

  storage,

  fileFilter: (req, file, cb) => {

    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."));
    }

  }

});

module.exports = pdfUpload;
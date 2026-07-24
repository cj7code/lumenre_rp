/**
 * ==========================================================
 * middleware/excelUpload.js
 * ----------------------------------------------------------
 * Handles Excel file uploads for bulk student import.
 * ==========================================================
 */

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/excel");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      `students_${Date.now()}${path.extname(file.originalname)}`
    );
  }

});

const excelUpload = multer({

  storage,

  fileFilter: (req, file, cb) => {

    const allowed = [
      ".xlsx",
      ".xls"
    ];

    const extension = path.extname(file.originalname).toLowerCase();

    if (allowed.includes(extension)) {

      cb(null, true);

    } else {

      cb(new Error("Only Excel files are allowed."));

    }

  }

});

module.exports = excelUpload;
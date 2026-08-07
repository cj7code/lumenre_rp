/**
 * ==========================================================
 * models/ResultSlip.js
 * ----------------------------------------------------------
 * Stores uploaded PDF result slips for students.
 * One student can only have ONE result slip per
 * academic year, year of study, and semester.
 * ==========================================================
 */

const mongoose = require("mongoose");

const resultSlipSchema = new mongoose.Schema(
  {
    // Student receiving this result slip
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    // Academic year
    academicYear: {
      type: String,
      required: true,
    },

    // Year of study
    year: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },

    // Semester
    semester: {
      type: Number,
      enum: [1, 2],
      required: true,
    },

    // PDF file location
    pdfUrl:{
        type:String,
        required:true
    },

    cloudinaryPublicId:{
        type:String,
        required:true
    },

    // Has the admin released this result?
    released: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * ==========================================================
 * Compound Unique Index
 * ----------------------------------------------------------
 * Prevents duplicate result slips for the same student
 * in the same academic year, year, and semester.
 * ==========================================================
 */
resultSlipSchema.index(
  {
    student: 1,
    academicYear: 1,
    year: 1,
    semester: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("ResultSlip", resultSlipSchema);
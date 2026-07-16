/**
 * ==========================================================
 * models/Result.js
 * ----------------------------------------------------------
 * Stores each student's mark for a specific course.
 * ==========================================================
 */

const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    // Link to the Student collection
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    // Link to the Course collection
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    continuousAssessment: {
      type: Number,
      default: 0,
    },

    finalExam: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    grade: {
      type: String,
      required: true,
    },

    remark: {
      type: String,
      default: "PASS",
    },

    academicYear: {
      type: String,
      default: "2026",
    },

    year: {
      type: Number,
      enum: [1, 2, 3],
    },

    semester: {
      type: Number,
      enum: [1, 2],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", resultSchema);
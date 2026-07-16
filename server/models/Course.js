/**
 * ==========================================================
 * models/Course.js
 * ----------------------------------------------------------
 * Stores all courses offered in the programme.
 * ==========================================================
 */

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    courseName: {
      type: String,
      required: true,
    },

    creditHours: {
      type: Number,
      required: true,
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

module.exports = mongoose.model("Course", courseSchema);
/**
 * ==========================================================
 * models/Student.js
 * ----------------------------------------------------------
 * Stores student information.
 * Each student can log in using Student ID + Full Name.
 * ==========================================================
 */

const mongoose = require("mongoose");

// Create the Student Schema
const studentSchema = new mongoose.Schema(
  {
    // Student's full name
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    // Student ID (must be unique)
    studentId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    // Programme name
    programme: {
      type: String,
      default: "Diploma in Registered Nursing",
    },

    // Current year of study
    year: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },

    // Current semester
    semester: {
      type: Number,
      enum: [1, 2],
      required: true,
    },

    // Intake
    intake: {
      type: String,
      default: "January",
    },

    // Is the student active?
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    // Automatically create createdAt and updatedAt
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("Student", studentSchema);
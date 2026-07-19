/**
 * ==========================================================
 * models/ResultSlip.js
 * ----------------------------------------------------------
 * Stores uploaded PDF result slips for students.
 * ==========================================================
 */

const mongoose = require("mongoose");

const resultSlipSchema = new mongoose.Schema(
  {
    // Student receiving this result slip
    student:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Student",
      required:true
    },

    // Academic year
    academicYear:{
      type:String,
      required:true
    },

    // Year of study
    year:{
      type:Number,
      enum:[1,2,3],
      required:true
    },

    // Semester
    semester:{
      type:Number,
      enum:[1,2],
      required:true
    },

    // PDF file location
    filePath:{
      type:String,
      required:true
    },


    // Has admin released the result?
    released:{
      type:Boolean,
      default:false
    }

  },
  {
    timestamps:true
  }
);


module.exports =
mongoose.model(
"ResultSlip",
resultSlipSchema
);
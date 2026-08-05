/**
 * ==========================================================
 * models/StudentActivity.js
 * ----------------------------------------------------------
 * Stores student portal activity.
 * ==========================================================
 */

const mongoose = require("mongoose");

const studentActivitySchema = new mongoose.Schema({

  // Student performing the action
  student:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Student",
    required:true
  },

  // Activity type
  action:{
    type:String,
    required:true,
    trim:true
  },

  // Human-readable description
  description:{
    type:String,
    required:true,
    trim:true
  }

},{
  timestamps:true
});

module.exports = mongoose.model(
  "StudentActivity",
  studentActivitySchema
);
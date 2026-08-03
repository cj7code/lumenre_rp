/**
 * ==========================================================
 * models/AuditLog.js
 * ----------------------------------------------------------
 * Stores administrator activities.
 *
 * Used for accountability and tracking changes.
 * ==========================================================
 */


const mongoose = require("mongoose");


const auditSchema = new mongoose.Schema({

  admin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Admin",
    required:true
  },


  action:{
    type:String,
    required:true
  },


  description:{
    type:String,
    required:true
  },


  targetId:{
    type:mongoose.Schema.Types.ObjectId,
    required:false
  }


},
{
  timestamps:true
});


module.exports =
mongoose.model(
  "AuditLog",
  auditSchema
);
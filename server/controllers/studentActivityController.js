/**
 * ==========================================================
 * controllers/studentActivityController.js
 * ----------------------------------------------------------
 * Returns student activity history.
 * ==========================================================
 */

const StudentActivity =
require("../models/StudentActivity");

const asyncHandler =
require("../middleware/asyncHandler");

const getStudentActivities =
asyncHandler(async(req,res)=>{

  const activities =
  await StudentActivity.find()

  .populate(
    "student",
    "fullName studentId"
  )

  .sort({
    createdAt:-1
  });

  res.json({

    success:true,

    data:activities

  });

});

module.exports = {

  getStudentActivities

};
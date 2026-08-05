/**
 * ==========================================================
 * utils/createStudentActivity.js
 * ----------------------------------------------------------
 * Creates student activity records.
 * ==========================================================
 */

const StudentActivity =
require("../models/StudentActivity");

const createStudentActivity =
async({
  student,
  action,
  description
})=>{

  // Prevent invalid records
  if(
    !student ||
    !action ||
    !description
  ){

    console.log(
      "Student activity skipped:",
      {
        student,
        action,
        description
      }
    );

    return;

  }

  await StudentActivity.create({

    student,
    action,
    description

  });

};

module.exports =
createStudentActivity;
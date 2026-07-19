/**
 * ==========================================================
 * File: services/excelResultService.js
 * ----------------------------------------------------------
 * Reads Excel files and saves student results.
 * ==========================================================
 */


const XLSX = require("xlsx");

const Student = require("../models/Student");
const Course = require("../models/Course");
const Result = require("../models/Result");

const AppError = require("../utils/AppError");

const processExcelResults = async(filePath)=>{
  // Read Excel workbook
  const workbook =
  XLSX.readFile(filePath);

  // Select first sheet
  const sheetName =
  workbook.SheetNames[0];

  const worksheet =
  workbook.Sheets[sheetName];

  // Convert sheet to JSON
  const rows =
  XLSX.utils.sheet_to_json(
    worksheet
  );

  const savedResults=[];

  for(const row of rows){


    const student =
    await Student.findOne({
      studentId:row.studentId
    });

    if(!student){

      throw new AppError(
        `Student ${row.studentId} not found`,
        404
      );

    }

    const course =
    await Course.findOne({
      courseCode:row.courseCode
    });

    if(!course){

      throw new AppError(
        `Course ${row.courseCode} not found`,
        404
      );

    }

    const total =
    Number(row.ca) +
    Number(row.exam);


    const result =
    await Result.create({

      student:student._id,
      course:course._id,
      continuousAssessment:row.ca,
      finalExam:row.exam,
      total,
      grade:calculateGrade(total),
      remark:getRemark(total),
      academicYear:"2026",
      year:course.year,
      semester:course.semester

    });

    savedResults.push(result);

  }

  return savedResults;

};


// Grade calculator
const calculateGrade=(score)=>{

  if(score>=75)
    return "A";

  if(score>=65)
    return "B";

  if(score>=55)
    return "C";

  if(score>=50)
    return "D";

  return "F";

};

// Remark calculator
const getRemark=(score)=>{

  return score>=50
  ? "PASS"
  : "FAIL";

};


module.exports={
processExcelResults
};
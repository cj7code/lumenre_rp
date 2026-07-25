/**
 * ==========================================================
 * controllers/bulkStudentController.js
 * ----------------------------------------------------------
 * Imports students from an Excel spreadsheet.
 * ==========================================================
 */

const XLSX = require("xlsx");
const Student = require("../models/Student");
const asyncHandler = require("../middleware/asyncHandler");
const fs = require("fs");

const importStudents = asyncHandler(async (req, res) => {

  if (!req.file) {

    return res.status(400).json({
      success: false,
      message: "Please upload an Excel file."
    });

  }

  const workbook = XLSX.readFile(req.file.path);

  const sheetName = workbook.SheetNames[0];

  const rows = XLSX.utils.sheet_to_json(
    workbook.Sheets[sheetName]
  );

  let imported = 0;
    let duplicates = 0;
    let errors = 0;

    const errorList = [];

    for (let i = 0; i < rows.length; i++) {

    const row = rows[i];

    const studentId = row.studentId?.toString().trim();
    const fullName = row.fullName?.toString().trim();

    const year = Number(row.year);
    const semester = Number(row.semester);

    // Student ID required
    if (!studentId) {

        errors++;

        errorList.push({
        row: i + 2,
        studentId: "",
        reason: "Student ID is required."
        });

        continue;

    }

    // Name required
    if (!fullName) {

        errors++;

        errorList.push({
        row: i + 2,
        studentId,
        reason: "Student name is required."
        });

        continue;

    }

    // Validate year
    if (![1, 2, 3].includes(year)) {

        errors++;

        errorList.push({
        row: i + 2,
        studentId,
        reason: "Year must be 1, 2 or 3."
        });

        continue;

    }

    // Validate semester
    if (![1, 2].includes(semester)) {

        errors++;

        errorList.push({
        row: i + 2,
        studentId,
        reason: "Semester must be 1 or 2."
        });

        continue;

    }

    const exists = await Student.findOne({
        studentId
    });

    if (exists) {

        duplicates++;

        errorList.push({
        row: i + 2,
        studentId,
        reason: "Student already exists."
        });

        continue;

    }

    await Student.create({

        studentId,
        fullName,
        year,
        semester,
        isActive: true

    });

    imported++;

  }

  /**
 * ==========================================================
 * Export all students to Excel
 * GET /api/bulk-students/export
 * ==========================================================
 */

const exportStudents = asyncHandler(async (req, res) => {

  const students = await Student.find()
    .sort({
      fullName: 1
    });

  const data = students.map(student => ({

    "Student ID": student.studentId,
    "Full Name": student.fullName,
    "Year": student.year,
    "Semester": student.semester,
    "Status": student.isActive
      ? "Active"
      : "Inactive"

  }));

  const workbook = XLSX.utils.book_new();

  const worksheet =
    XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Students"

  );

  const buffer = XLSX.write(

    workbook,

    {
      type: "buffer",
      bookType: "xlsx"
    }

  );

  res.setHeader(

    "Content-Disposition",

    "attachment; filename=Students.xlsx"

  );

  res.setHeader(

    "Content-Type",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

  );

  res.send(buffer);

});



  if (fs.existsSync(req.file.path)) {

    fs.unlinkSync(req.file.path);

  }


  res.status(200).json({

    success: true,

    message: "Student import completed.",

    data: {

        total: rows.length,
        imported,
        duplicates,
        errors,
        errorList

    }

  });

});

module.exports = {
  importStudents,
  exportStudents
};
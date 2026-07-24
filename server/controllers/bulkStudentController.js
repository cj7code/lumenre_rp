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
  let skipped = 0;

  for (const row of rows) {

    const exists = await Student.findOne({
      studentId: row.studentId
    });

    if (exists) {

      skipped++;
      continue;

    }

    await Student.create({

      studentId: row.studentId,
      fullName: row.fullName,
      year: row.year,
      semester: row.semester,
      isActive: true

    });

    imported++;

  }

  res.status(200).json({

    success: true,
    message: "Student import completed.",

    data: {

      imported,
      skipped,
      total: rows.length

    }

  });

});

module.exports = {
  importStudents
};
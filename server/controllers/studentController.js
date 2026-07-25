/**
 * ==========================================================
 * controllers/studentController.js
 * ==========================================================
 */

const Student = require("../models/Student");
const asyncHandler = require("../middleware/asyncHandler");
const studentService = require("../services/studentService");

//Create Student
const createStudent = asyncHandler(async (req, res) => {

  const student = await studentService.createStudent(req.body);

  res.status(201).json({

    success: true,
    message: "Student created successfully.",
    data: student,

  });

});

// Get All Students
const getStudents = asyncHandler(async (req, res) => {

  const students = await studentService.getStudents();

  res.status(200).json({

    success: true,

    count: students.length,

    data: students,

  });

});

/**
 * ==========================================================
 * Admin: Get students
 * Supports:
 * Search
 * Year filter
 * Semester filter
 * Status filter
 * Pagination
 * ==========================================================
 */

const getAllStudentsForAdmin = asyncHandler(async (req, res) => {

  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 25;

  const skip = (page - 1) * limit;


  const {

    search,

    year,

    semester,

    status

  } = req.query;


  const query = {
    isDeleted: false
  };


  if (search) {

    query.$or = [

      {

        fullName: {

          $regex: search,

          $options: "i"

        }

      },

      {

        studentId: {

          $regex: search,

          $options: "i"

        }

      }

    ];

  }


  if (year) {

    query.year = Number(year);

  }


  if (semester) {

    query.semester = Number(semester);

  }


  if (status !== undefined && status !== "") {

    query.isActive = status === "true";

  }


  const totalStudents =

    await Student.countDocuments(query);


  const students = await Student.find(query)

    .sort({

      fullName: 1

    })

    .skip(skip)

    .limit(limit);


  res.status(200).json({

    success: true,

    count: students.length,

    totalStudents,

    currentPage: page,

    totalPages: Math.ceil(totalStudents / limit),

    data: students

  });

});

// Get Student

const getStudent = asyncHandler(async (req, res) => {

  const student = await studentService.getStudentById(
    req.params.id
  );

  res.status(200).json({

    success: true,

    data: student,

  });

});

//Update Student
const updateStudent = asyncHandler(async (req, res) => {

  const student = await studentService.updateStudent(
    req.params.id,
    req.body
  );

  res.status(200).json({

    success: true,

    message: "Student updated successfully.",

    data: student,

  });

});

/**
 * ==========================================================
 * Admin: Soft delete student
 * DELETE /api/students/:id
 * ==========================================================
 */

const deleteStudent = asyncHandler(async (req,res)=>{


  const student = await Student.findById(
    req.params.id
  );


  if(!student){

    return res.status(404).json({

      success:false,

      message:"Student not found."

    });

  }


  student.isDeleted = true;

  student.isActive = false;


  await student.save();


  res.status(200).json({

    success:true,

    message:"Student removed successfully."

  });


});

/**
 * ==========================================================
 * Admin: Toggle Student Status
 * PATCH /api/students/:id/status
 * ==========================================================
 */

const toggleStudentStatus = asyncHandler(async (req, res) => {

  const student = await Student.findById(
    req.params.id
  );

  if (!student) {

    return res.status(404).json({
      success: false,
      message: "Student not found."
    });

  }

  student.isActive = !student.isActive;

  await student.save();

  res.status(200).json({

    success: true,

    message: "Student status updated successfully.",

    data: student

  });

});

/**
 * ==========================================================
 * Admin: Bulk update student status
 * PATCH /api/students/bulk/status
 * ==========================================================
 */

const bulkUpdateStatus = asyncHandler(async (req, res) => {

  const {
    studentIds,
    status
  } = req.body;


  if (!studentIds || !Array.isArray(studentIds)) {

    return res.status(400).json({

      success:false,

      message:"Student IDs are required."

    });

  }


  await Student.updateMany(

    {
      _id:{
        $in:studentIds
      }
    },

    {
      isActive:status
    }

  );


  res.status(200).json({

    success:true,

    message:"Student status updated successfully."

  });

});



/**
 * ==========================================================
 * Admin: Bulk delete students
 * DELETE /api/students/bulk/delete
 * ==========================================================
 */

const bulkDeleteStudents = asyncHandler(async (req,res)=>{


  const {
    studentIds
  } = req.body;


  if (!studentIds || !Array.isArray(studentIds)) {

    return res.status(400).json({

      success:false,

      message:"Student IDs are required."

    });

  }


  await Student.updateMany(
    {

      _id:{
        $in:studentIds
      }
    },

    {

      isDeleted:true,

      isActive:false

    }

  );


  res.status(200).json({

    success:true,

    message:"Students deleted successfully."

  });


});


/**
 * ==========================================================
 * Restore deleted student
 * PATCH /api/students/:id/restore
 * ==========================================================
 */

const restoreStudent = asyncHandler(async(req,res)=>{


  const student = await Student.findById(
    req.params.id
  );


  if(!student){

    return res.status(404).json({

      success:false,

      message:"Student not found."

    });

  }


  student.isDeleted=false;

  student.isActive=true;


  await student.save();


  res.status(200).json({

    success:true,

    message:"Student restored successfully."

  });


});

module.exports = {

  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  getAllStudentsForAdmin,
  toggleStudentStatus,
  bulkUpdateStatus,
  bulkDeleteStudents,
  restoreStudent

};
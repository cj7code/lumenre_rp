/**
 * ==========================================================
 * File: controllers/authController.js
 * ==========================================================
 */


const asyncHandler =
require("../middleware/asyncHandler");

const authService =
require("../services/authService");

// Student Login
const studentLogin = asyncHandler(
async(req,res)=>{

const {
studentId,
fullName
}=req.body;

const result =
await authService.studentLogin(
studentId,
fullName
);

res.status(200).json({
success:true,
message:"Student login successful",
data:result

});

});


// Admin Login
const adminLogin = asyncHandler(
async(req,res)=>{

const {
email,
password
}=req.body;

const result =
await authService.adminLogin(
email,
password
);

res.status(200).json({
success:true,
message:"Admin login successful",
data:result

});

});


module.exports={
studentLogin,
adminLogin
};
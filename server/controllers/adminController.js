/**
 * ==========================================================
 * adminController.js
 * ----------------------------------------------------------
 * Handles administrator authentication requests.
 * ==========================================================
 */

const asyncHandler =
require("../middleware/asyncHandler");

const adminService =
require("../services/adminService");


const registerAdmin = asyncHandler(
async (req, res) => {

  const admin =
  await adminService.registerAdmin(
    req.body
  );

  res.status(201).json({
    success:true,
    message:"Admin created successfully",
    data:admin
  });

});


const loginAdmin = asyncHandler(
async (req,res)=>{

  const {
    email,
    password
  } = req.body;


  const result =
  await adminService.loginAdmin(
    email,
    password
  );


  res.status(200).json({
    success:true,
    data:result
  });

});


module.exports = {
  registerAdmin,
  loginAdmin
};
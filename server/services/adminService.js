/**
 * ==========================================================
 * services/adminService.js
 * ----------------------------------------------------------
 * Handles administrator registration and login logic.
 * ==========================================================
 */

const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const AppError = require("../utils/AppError");
const generateToken = require("../utils/generateToken");


const registerAdmin = async (adminData) => {

  const existingAdmin = await Admin.findOne({
    email: adminData.email
  });

  if (existingAdmin) {
    throw new AppError(
      "Admin already exists",
      400
    );
  }

  const hashedPassword = await bcrypt.hash(
    adminData.password,
    10
  );

  const admin = await Admin.create({
    fullName: adminData.fullName,
    email: adminData.email,
    password: hashedPassword,
    role: "admin"
  });

  return admin;
};


const loginAdmin = async (email, password) => {

  const admin = await Admin.findOne({
    email
  });

  if (!admin) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const isMatch = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isMatch) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const token = generateToken(
    admin._id,
    admin.role
  );

  return {
    admin,
    token
  };
};


module.exports = {
  registerAdmin,
  loginAdmin
};
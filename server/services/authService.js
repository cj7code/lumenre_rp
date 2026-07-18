/**
 * ==========================================================
 * services/authService.js
 * ----------------------------------------------------------
 * Handles authentication business logic.
 * ==========================================================
 */

const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const AppError = require("../utils/AppError");
const generateToken = require("../utils/generateToken");

/**
 * ----------------------------------------------------------
 * Student Login
 *
 * Login credentials:
 * Student ID
 * Full Name
 * ----------------------------------------------------------
 */

const studentLogin = async(studentId, fullName)=>{
    const student = await Student.findOne({
        studentId,
        fullName
    });

    if(!student){

        throw new AppError(
            "Invalid student credentials",
            401
        );

    }

    const token = generateToken(
        student._id,
        "student"
    );

    return {
        student,
        token
    };

};

/**
 * ----------------------------------------------------------
 * Admin Login
 *
 * Email + Password
 * ----------------------------------------------------------
 */

const adminLogin = async(email,password)=>{
    const admin = await Admin.findOne({
        email
    });

    if(!admin){

        throw new AppError(
            "Invalid login details",
            401
        );

    }

    const passwordMatch =
        await bcrypt.compare(
            password,
            admin.password
        );

    if(!passwordMatch){

        throw new AppError(
            "Invalid login details",
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

module.exports={
    studentLogin,
    adminLogin
};
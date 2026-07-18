/**
 * ==========================================================
 * File: middleware/authMiddleware.js
 * ----------------------------------------------------------
 * Protects routes using JWT authentication.
 *
 * Responsibilities:
 * - Extract JWT token
 * - Verify token
 * - Identify logged-in user
 * - Check user roles
 * ==========================================================
 */


const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const AppError = require("../utils/AppError");

/**
 * ----------------------------------------------------------
 * Protect Routes
 *
 * Checks if user has a valid JWT token
 * ----------------------------------------------------------
 */

const protect = asyncHandler(async (req, res, next) => {

    let token;

    // Check Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        // Extract token
        token =
        req.headers.authorization.split(" ")[1];

    }

    if (!token) {
        throw new AppError(
            "Not authorized. Please login.",
            401
        );

    }

    try {


        // Verify token
        const decoded =
        jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user information to request
        req.user = decoded;

        next();

    } catch(error){
        throw new AppError(
            "Invalid or expired token.",
            401
        );

    }

});

/**
 * ----------------------------------------------------------
 * Restrict access by role
 * ----------------------------------------------------------
 */

const authorize = (...roles) => {

    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new AppError(
                "You are not allowed to access this resource.",
                403
            );

        }

        next();
    };
};



module.exports = {
    protect,
    authorize
};
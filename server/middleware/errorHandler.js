/**
 * ==========================================================
 * middleware/errorHandler.js
 * ----------------------------------------------------------
 * Global error handling middleware.
 * ==========================================================
 */

const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({

    success:false,

    status:err.status || "error",

    message:err.message || "Internal Server Error"

  });

};

module.exports = errorHandler;
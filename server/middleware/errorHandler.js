/**
 * ==========================================================
 * middleware/errorHandler.js
 * ----------------------------------------------------------
 * Global API error handler.
 * ==========================================================
 */

const errorHandler = (err, req, res, next) => {

  console.error("========== SERVER ERROR ==========");
  console.error(err.stack || err.message);
  console.error("===================================");


  res.status(
    err.statusCode || 500
  ).json({

    success:false,

    message:
    err.message || "Server Error"

  });

};


module.exports = errorHandler;
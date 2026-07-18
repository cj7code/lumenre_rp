/**
 * ==========================================================
 * middleware/asyncHandler.js
 * ----------------------------------------------------------
 * Eliminates repetitive try/catch blocks in async controllers.
 * ==========================================================
 */

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
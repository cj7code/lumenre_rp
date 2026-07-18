/**
 * ==========================================================
 * File: middleware/notFound.js
 * ----------------------------------------------------------
 * Handles requests to routes that do not exist.
 * ==========================================================
 */

const notFound = (req, res, next) => {

    const error = new Error(
        `Route not found - ${req.originalUrl}`
    );

    res.status(404);

    next(error);

};

module.exports = notFound;
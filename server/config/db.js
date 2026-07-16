/**
 * ==========================================================
 * File: config/db.js
 * ----------------------------------------------------------
 * Creates and manages the MongoDB connection.
 * ==========================================================
 */

const mongoose = require("mongoose");

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    // Connect using the URI stored in .env
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    // Stop the server if the database is unavailable
    process.exit(1);
  }
};

module.exports = connectDB;
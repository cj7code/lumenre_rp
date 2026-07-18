/**
 * ==========================================================
 * server.js
 * ----------------------------------------------------------
 * Main entry point of the backend.
 *
 * Responsibilities:
 * - Load environment variables
 * - Connect to MongoDB
 * - Configure middleware
 * - Register routes
 * - Handle errors
 * - Start Express server
 * ==========================================================
 */

// Import Packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import Application Files
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

// Create Express Application
const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message: "Welcome to Lumenre Results Portal API 🚀"
  });

});

// ==========================================================
// Error Handling Middleware
// IMPORTANT:
// These MUST always be LAST
// ==========================================================

// Handle unknown routes
app.use(notFound);

// Handle application errors
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
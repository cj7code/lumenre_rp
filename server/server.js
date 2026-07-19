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
 * - Access uploaded file
 * - Start Express server
 * ==========================================================
 */

// Import Packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Import Application Files
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const testRoutes = require("./routes/testRoutes");
const resultRoutes = require("./routes/resultRoutes");
const adminResultRoutes = require("./routes/adminResultRoutes");
const adminRoutes = require("./routes/adminRoutes");

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
app.use("/api/test", testRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/admin/results", adminResultRoutes);
app.use("/api/admin", adminRoutes);

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

// Uploaded file access
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
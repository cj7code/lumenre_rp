/**
 * ==========================================================
 * File: server.js
 * ----------------------------------------------------------
 * Main entry point of Lumenre Results Portal backend.
 *
 * Responsibilities:
 * - Load environment variables
 * - Connect to MongoDB
 * - Configure Express middleware
 * - Register API routes
 * - Serve uploaded PDF files
 * - Handle application errors
 * - Start server
 * ==========================================================
 */


// ==========================================================
// Import Packages
// ==========================================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");


// ==========================================================
// Import Application Files
// ==========================================================

const connectDB = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");
const bulkStudentRoutes = require("./routes/bulkStudentRoutes");
const studentActivityRoutes = require("./routes/studentActivityRoutes");
const resultSlipRoutes = require("./routes/resultSlipRoutes");
const auditRoutes = require("./routes/auditRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const resultRoutes = require("./routes/resultRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");


// ==========================================================
// Load Environment Variables
// ==========================================================

dotenv.config();


// ==========================================================
// Connect MongoDB
// ==========================================================

connectDB();


// ==========================================================
// Create Express Application
// ==========================================================

const app = express();


// ==========================================================
// Global Middleware
// ==========================================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);


// ==========================================================
// Serve Uploaded Files
//
// Allows browser access to uploaded PDFs:
//
// http://localhost:5000/uploads/results/file.pdf
//
// IMPORTANT:
// This must come before error handling.
// ==========================================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// ==========================================================
// API Routes
// ==========================================================

app.use("/api/students", studentRoutes);
app.use("/api/bulk-students", bulkStudentRoutes);
app.use("/api/student-activity", studentActivityRoutes);
app.use("/api/result-slips", resultSlipRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/admin", adminRoutes);

// ==========================================================
// Test Route
// ==========================================================

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
    "Welcome to Lumenre Results Portal API 🚀"

  });

});


// ==========================================================
// Error Handling Middleware
//
// These MUST always remain LAST.
// ==========================================================

app.use(notFound);

app.use(errorHandler);


// ==========================================================
// Start Server
// ==========================================================

const PORT =
process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});
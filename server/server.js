/**
 * ==========================================================
 * server.js
 * Main entry point of the backend
 * ==========================================================
 */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/studentRoutes");

// Load environment variables
dotenv.config();

// Import the database connection
const connectDB = require("./config/db");

// Connect to MongoDB BEFORE starting the server
connectDB();

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Registe Student API routes
app.use("/api/students", studentRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Lumenre Results Portal API 🚀",
  });
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
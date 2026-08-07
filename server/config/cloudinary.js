/**
 * ==========================================================
 * File: config/cloudinary.js
 * ----------------------------------------------------------
 * Cloudinary configuration.
 *
 * Purpose:
 *
 * - Connects backend to Cloudinary
 * - Allows uploading PDF result slips
 * - Provides secure cloud storage
 *
 * Environment variables required:
 *
 * CLOUDINARY_CLOUD_NAME
 * CLOUDINARY_API_KEY
 * CLOUDINARY_API_SECRET
 *
 * ==========================================================
 */


const cloudinary = require("cloudinary").v2;


// ==========================================================
// Configure Cloudinary
// ==========================================================

cloudinary.config({

  cloud_name:
  process.env.CLOUDINARY_CLOUD_NAME,


  api_key:
  process.env.CLOUDINARY_API_KEY,


  api_secret:
  process.env.CLOUDINARY_API_SECRET

});


// ==========================================================
// Export Cloudinary Instance
// ==========================================================

module.exports = cloudinary;
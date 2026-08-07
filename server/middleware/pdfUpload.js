/**
 * ==========================================================
 * File: middleware/pdfUpload.js
 * ----------------------------------------------------------
 * Cloudinary PDF upload middleware.
 *
 * Purpose:
 *
 * - Receives PDF result slips
 * - Uploads directly to Cloudinary
 * - Stores secure PDF URL
 *
 * ==========================================================
 */


const multer = require("multer");

const {
  CloudinaryStorage
} = require(
  "multer-storage-cloudinary"
);


const cloudinary = require(
  "../config/cloudinary"
);



// ==========================================================
// Cloudinary Storage Configuration
// ==========================================================


const storage = new CloudinaryStorage({

  cloudinary,


  params:{


    folder:
    "lumenre/result-slips",


    resource_type:
    "raw",


    allowed_formats:[

      "pdf"

    ]

  }

});




// ==========================================================
// File Upload Configuration
// ==========================================================


const pdfUpload = multer({

  storage,


  limits:{

    fileSize:
    10 * 1024 * 1024

  },


  fileFilter:(req,file,callback)=>{


    if(
      file.mimetype === "application/pdf"
    ){

      callback(
        null,
        true
      );

    }

    else{

      callback(

        new Error(
          "Only PDF files are allowed"
        ),

        false

      );

    }


  }


});



module.exports = pdfUpload;
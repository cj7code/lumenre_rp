/**
 * ==========================================================
 * middleware/uploadMiddleware.js
 * ----------------------------------------------------------
 * Handles Excel file uploads using Multer.
 * ==========================================================
 */

const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

  destination:(req,file,cb)=>{

    cb(null,"uploads/");

  },

  filename:(req,file,cb)=>{
    cb(
      null,
      Date.now() +
      path.extname(file.originalname)
    );

  }

});


const upload = multer({
  storage,
  fileFilter:(req,file,cb)=>{

    const allowedExtensions =
    [".xlsx",".xls"];

    const extension =
    path.extname(file.originalname);

    if(allowedExtensions.includes(extension)){

      cb(null,true);

    }
    else{

      cb(
        new Error(
          "Only Excel files are allowed"
        ),
        false
      );

    }

  }

});


module.exports = upload;
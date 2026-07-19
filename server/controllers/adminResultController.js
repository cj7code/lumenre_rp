/**
 * ==========================================================
 * File: controllers/adminResultController.js
 * ==========================================================
 */

const asyncHandler =
require("../middleware/asyncHandler");


const uploadResults =
asyncHandler(async(req,res)=>{


  console.log("BODY:", req.body);

  console.log("FILE:", req.file);



  res.json({

    success:true,

    message:"Upload reached controller",

    file:req.file

  });


});


module.exports = {
  uploadResults
};
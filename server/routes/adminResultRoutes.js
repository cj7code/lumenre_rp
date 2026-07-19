/**
 * ==========================================================
 * File: routes/adminResultRoutes.js
 * ==========================================================
 */


const express=require("express");
const router=express.Router();

const upload=require("../middleware/uploadMiddleware");

const {
uploadResults
}=require("../controllers/adminResultController");

const {
protect,
authorize
}=require("../middleware/authMiddleware");


router.post(
"/upload",
protect,
authorize("admin"),
upload.single("file"),
uploadResults
);

module.exports=router;
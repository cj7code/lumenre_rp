/**
 * ==========================================================
 * File: routes/testRoutes.js
 * ----------------------------------------------------------
 * Temporary routes for testing authentication.
 * ==========================================================
 */


const express = require("express");

const router = express.Router();


const {
    protect,
    authorize
} = require("../middleware/authMiddleware");



/**
 * Any logged-in user
 */

router.get(
"/profile",
protect,
(req,res)=>{


    res.json({

        success:true,

        message:"Protected profile accessed",

        user:req.user

    });


});



/**
 * Student only
 */

router.get(
"/student-area",
protect,
authorize("student"),
(req,res)=>{


    res.json({

        success:true,

        message:"Welcome student area",

        user:req.user

    });


});



/**
 * Admin only
 */

router.get(
"/admin-area",
protect,
authorize("admin"),
(req,res)=>{


    res.json({

        success:true,

        message:"Welcome admin area",

        user:req.user

    });


});



module.exports = router;
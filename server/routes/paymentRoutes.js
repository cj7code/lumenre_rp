/**
 * ==========================================================
 * routes/paymentRoutes.js
 * ==========================================================
 */


const express = require("express");

const router =
express.Router();


const {
getPayments,
updatePayment
}=require("../controllers/paymentController");


const {
protect,
authorize
}=require("../middleware/authMiddleware");

router.get(
"/",
protect,
authorize("admin"),
getPayments
);

router.post(
"/",
protect,
authorize("admin"),
updatePayment
);

module.exports = router;
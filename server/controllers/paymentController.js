/**
 * ==========================================================
 * controllers/paymentController.js
 * ----------------------------------------------------------
 * Handles student payment management.
 * ==========================================================
 */

const Payment = require("../models/Payment");
const asyncHandler = require("../middleware/asyncHandler");


/**
 * ==========================================================
 * Admin:
 * Get all payments
 * GET /api/payments
 * ==========================================================
 */

const getPayments = asyncHandler(async(req,res)=>{


const payments = await Payment.find()

.populate(
"student",
"fullName studentId year semester"
)

.sort({
createdAt:-1
});


res.status(200).json({

success:true,

count:payments.length,

data:payments

});


});



/**
 * ==========================================================
 * Admin:
 * Create or update payment
 * POST /api/payments
 * ==========================================================
 */


const updatePayment = asyncHandler(async(req,res)=>{

const {

student,
totalFees,
amountPaid

}=req.body;

const balance = Math.max(
    Number(totalFees) - Number(amountPaid),
    0
);



const fullyPaid =
balance <= 0;



const payment =
await Payment.findOneAndUpdate(

{student},

{
student,
totalFees,
amountPaid,
balance,
fullyPaid
},

{

new:true,
upsert:true

}

);



res.status(200).json({

success:true,
message:"Payment updated successfully.",
data:payment

});


});


module.exports={
getPayments,
updatePayment
};
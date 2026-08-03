/**
 * ==========================================================
 * controllers/auditController.js
 * ----------------------------------------------------------
 * Displays administrator activity history.
 * ==========================================================
 */


const AuditLog =
require("../models/AuditLog");

const asyncHandler =
require("../middleware/asyncHandler");



/**
 * GET ALL AUDIT LOGS
 *
 * Admin only
 */

const getAuditLogs =
asyncHandler(async(req,res)=>{


const logs =
await AuditLog.find()

.populate(
"admin",
"fullName email"
)

.sort({
createdAt:-1
});


res.json({

success:true,

data:logs

});


});


module.exports = {

getAuditLogs

};
/**
 * ==========================================================
 * File: utils/createAudit.js
 * ----------------------------------------------------------
 * Reusable audit log creator.
 *
 * Receives one object containing:
 * - admin
 * - action
 * - description
 * - targetId (optional)
 *
 * ==========================================================
 */

const AuditLog = require("../models/AuditLog");


const createAudit = async ({
  admin,
  action,
  description,
  targetId
}) => {


  // Prevent incomplete audit records

  if(!admin || !action || !description){

    throw new Error(
      "Audit log requires admin, action, and description"
      );


    console.log(
        "Audit skipped: missing required data"
        );

    return;

    }


  await AuditLog.create({

    admin,

    action,

    description,

    targetId

  });


};


module.exports = createAudit;
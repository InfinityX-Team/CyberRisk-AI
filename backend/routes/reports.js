const express = require("express");
const AuditLog = require("../models/AuditLog");
const router = express.Router();

router.get("/", async (req, res) => {
  const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(100);
  res.json(logs);
});

module.exports = router;

const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  actor: String,
  event: String,
  severity: { type: String, enum: ["info", "warning", "critical"], default: "info" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AuditLog", auditLogSchema);

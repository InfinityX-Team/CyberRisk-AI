const express = require("express");
const router = express.Router();

const frameworks = {
  "NIST CSF 2.0": {
    domains: [
      { name: "Identify", score: 78 },
      { name: "Protect", score: 65 },
      { name: "Detect", score: 71 },
      { name: "Respond", score: 58 },
      { name: "Recover", score: 62 },
      { name: "Govern", score: 74 },
    ],
  },
  "ISO/IEC 27001:2022": {
    domains: [
      { name: "Context", score: 80 },
      { name: "Leadership", score: 70 },
      { name: "Planning", score: 66 },
      { name: "Support", score: 60 },
      { name: "Operation", score: 68 },
      { name: "Improvement", score: 72 },
    ],
  },
  "CIS Controls v8": {
    domains: [
      { name: "Basic", score: 82 },
      { name: "Foundational", score: 64 },
      { name: "Organizational", score: 59 },
    ],
  },
  "RBI Cyber Security Framework": {
    domains: [
      { name: "Governance", score: 71 },
      { name: "Identification", score: 68 },
      { name: "Protection", score: 60 },
      { name: "Detection", score: 63 },
      { name: "Response", score: 55 },
    ],
  },
  "SEBI CSCRF": {
    domains: [
      { name: "Governance", score: 74 },
      { name: "Identification", score: 69 },
      { name: "Protection", score: 62 },
      { name: "Detection", score: 65 },
      { name: "Response", score: 57 },
      { name: "Recovery", score: 60 },
    ],
  },
};

router.get("/:framework", (req, res) => {
  const key = Object.keys(frameworks).find(
    (f) => f.toLowerCase() === req.params.framework.toLowerCase()
  );
  if (!key) return res.status(404).json({ message: "Framework not found" });
  const data = frameworks[key];
  const overall = Math.round(
    data.domains.reduce((s, d) => s + d.score, 0) / data.domains.length
  );
  res.json({ framework: key, overall, domains: data.domains });
});

router.get("/", (req, res) => {
  res.json(Object.keys(frameworks));
});

module.exports = router;

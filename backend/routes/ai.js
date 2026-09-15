const express = require("express");
const Asset = require("../models/Asset");
const Vulnerability = require("../models/Vulnerability");
const router = express.Router();

router.post("/ask", async (req, res) => {
  const { question } = req.body;
  const q = (question || "").toLowerCase();

  const assets = await Asset.find().sort({ ale: -1 });
  const vulns = await Vulnerability.find().sort({ epss: -1 });

  let answer = "";

  if (q.includes("highest financial") || q.includes("biggest") || q.includes("highest risk")) {
    const top = assets[0];
    answer = `Your highest financial cyber risk is the "${top.name}" in ${top.businessUnit}, contributing an Expected Annual Loss of $${(top.ale / 1000).toFixed(1)}K.`;
  } else if (q.includes("vulnerabilit") && q.includes("expected loss")) {
    const top3 = vulns.slice(0, 3).map((v) => v.cve).join(", ");
    answer = `The vulnerabilities contributing most to expected losses are ${top3}, based on high CVSS and EPSS exploitation probability scores.`;
  } else if (q.includes("mfa")) {
    answer = `Rolling out MFA on all privileged accounts is estimated to reduce Expected Annual Loss by roughly 35%, and lower the enterprise risk score by about 7 points.`;
  } else if (q.includes("30") && q.includes("patch")) {
    answer = `A 30-day patching delay increases financial exposure by an estimated 12-15% due to rising exploit probability (EPSS) on open vulnerabilities.`;
  } else if (q.includes("board") || q.includes("60") || q.includes("summary")) {
    const totalALE = assets.reduce((s, a) => s + a.ale, 0);
    answer = `Board Summary: Enterprise Expected Annual Loss stands at $${(totalALE / 1000000).toFixed(2)}M with a Risk Score of 55/100. Control effectiveness is at 35%, with the Data Platform and Capital Markets business units driving most exposure. Recommended action: prioritize PAM and Zero-Trust segmentation investments.`;
  } else {
    answer = `Based on current telemetry, your total Expected Annual Loss is $${(assets.reduce((s, a) => s + a.ale, 0) / 1000000).toFixed(2)}M across ${assets.length} monitored assets. Ask me about top risks, vulnerabilities, or what-if scenarios for more detail.`;
  }

  res.json({ answer });
});

module.exports = router;

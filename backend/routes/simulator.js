const express = require("express");
const router = express.Router();

router.post("/run", async (req, res) => {
  const { mfa, zeroTrust, patchSla, edrCoverage, backupFrequency } = req.body;

  const baseline = 3.46;
  let reduction = 0;

  if (mfa) reduction += 0.35;
  if (zeroTrust) reduction += 0.4;
  reduction += ((60 - patchSla) / 60) * 0.3;
  reduction += (edrCoverage / 100) * 0.25;
  reduction += ((48 - backupFrequency) / 48) * 0.1;

  reduction = Math.max(0, Math.min(reduction, baseline * 0.6));

  const scenario = baseline - reduction;
  const lossAvoided = reduction * 1000000;

  res.json({
    baseline: baseline * 1000000,
    scenario: scenario * 1000000,
    lossAvoided,
    riskScoreBefore: 55,
    riskScoreAfter: Math.max(20, Math.round(55 - reduction * 20)),
    varBefore: 8.56,
    varAfter: +(8.56 - reduction * 0.6).toFixed(2),
    controlsBefore: 35,
    controlsAfter: Math.min(90, Math.round(35 + reduction * 25)),
  });
});

module.exports = router;

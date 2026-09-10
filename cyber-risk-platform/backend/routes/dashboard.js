const express = require("express");
const Asset = require("../models/Asset");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const assets = await Asset.find();
    const totalALE = assets.reduce((sum, a) => sum + a.ale, 0);
    const totalValue = assets.reduce((sum, a) => sum + a.value, 0);

    const trend = [
      { month: "Sep 25", ale: 3.1 },
      { month: "Oct 25", ale: 3.3 },
      { month: "Nov 25", ale: 3.0 },
      { month: "Dec 25", ale: 2.9 },
      { month: "Jan 26", ale: 3.2 },
      { month: "Feb 26", ale: 3.4 },
      { month: "Mar 26", ale: 3.1 },
      { month: "Apr 26", ale: 3.3 },
      { month: "May 26", ale: 3.5 },
      { month: "Jun 26", ale: 3.2 },
      { month: "Jul 26", ale: 3.3 },
      { month: "Aug 26", ale: 3.46 },
    ];

    const byBusinessUnit = {};
    assets.forEach((a) => {
      byBusinessUnit[a.businessUnit] = (byBusinessUnit[a.businessUnit] || 0) + a.ale;
    });

    const topContributors = [...assets].sort((a, b) => b.ale - a.ale).slice(0, 5);

    res.json({
      riskScore: 55,
      expectedAnnualLoss: totalALE,
      valueAtRisk: totalALE * 2.6,
      controlEffectiveness: 35,
      trend,
      byBusinessUnit: Object.entries(byBusinessUnit).map(([name, ale]) => ({ name, ale })),
      topContributors,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

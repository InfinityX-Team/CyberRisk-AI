const express = require("express");
const Control = require("../models/Control");
const router = express.Router();

router.get("/controls", async (req, res) => {
  const controls = await Control.find();
  res.json(controls);
});

router.post("/optimize", async (req, res) => {
  const { budget } = req.body;
  const controls = await Control.find().sort({ efficacy: -1 });

  let remaining = budget;
  const chosen = [];
  for (const c of controls) {
    if (c.cost <= remaining) {
      chosen.push(c);
      remaining -= c.cost;
    }
  }

  const totalEfficacy = chosen.reduce((s, c) => s + c.efficacy, 0);
  const lossAvoided = (totalEfficacy / 100) * 3460000 * 1.2;
  const rosi = ((lossAvoided - (budget - remaining)) / (budget - remaining || 1)) * 100;

  const frontier = [];
  let spend = 0;
  let reduction = 0;
  for (let i = 0; i < controls.length; i++) {
    spend += controls[i].cost;
    reduction += (controls[i].efficacy / 100) * 400000;
    frontier.push({ spend, reduction });
  }

  res.json({
    recommended: chosen,
    spent: budget - remaining,
    lossAvoided,
    rosi,
    frontier,
  });
});

module.exports = router;

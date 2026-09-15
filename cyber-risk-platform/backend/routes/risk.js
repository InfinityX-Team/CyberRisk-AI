const express = require("express");
const Asset = require("../models/Asset");
const Vulnerability = require("../models/Vulnerability");
const router = express.Router();

router.get("/assets", async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
});

router.get("/vulnerabilities", async (req, res) => {
  const vulns = await Vulnerability.find();
  res.json(vulns);
});

router.get("/heatmap", async (req, res) => {
  const assets = await Asset.find();
  const data = assets.map((a) => ({
    name: a.name,
    lef: a.lef,
    ale: a.ale,
  }));
  res.json(data);
});

module.exports = router;

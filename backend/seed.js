require("dotenv").config();
const mongoose = require("mongoose");
const Asset = require("./models/Asset");
const Vulnerability = require("./models/Vulnerability");
const Control = require("./models/Control");
const AuditLog = require("./models/AuditLog");

const assets = [
  { name: "Customer Database (PII)", businessUnit: "Data Platform", criticality: "Tier 5", value: 12000000, vulnPressure: 0.94, lef: 0.326, sle: 3000000, ale: 976500 },
  { name: "Trading Engine", businessUnit: "Capital Markets", criticality: "Tier 5", value: 15000000, vulnPressure: 0.706, lef: 0.249, sle: 3750000, ale: 935000 },
  { name: "Core Payment Gateway", businessUnit: "FinOps", criticality: "Tier 5", value: 8500000, vulnPressure: 0.853, lef: 0.297, sle: 2130000, ale: 631300 },
  { name: "Regulatory Reporting DB", businessUnit: "Compliance", criticality: "Tier 5", value: 5400000, vulnPressure: 0.892, lef: 0.31, sle: 1350000, ale: 418300 },
  { name: "IoT Manufacturing Sensors", businessUnit: "Operations", criticality: "Tier 4", value: 3300000, vulnPressure: 0.813, lef: 0.231, sle: 759000, ale: 175700 },
  { name: "Corporate Email (M365)", businessUnit: "IT", criticality: "Tier 4", value: 2200000, vulnPressure: 0.484, lef: 0.146, sle: 506000, ale: 73800 },
  { name: "Internal DevOps CI/CD", businessUnit: "Engineering", criticality: "Tier 4", value: 1400000, vulnPressure: 0.494, lef: 0.148, sle: 322000, ale: 47800 },
  { name: "HR Payroll SaaS", businessUnit: "HR", criticality: "Tier 3", value: 950000, vulnPressure: 0.647, lef: 0.146, sle: 199500, ale: 29200 },
  { name: "Customer Support Portal", businessUnit: "CX", criticality: "Tier 3", value: 620000, vulnPressure: 0.79, lef: 0.174, sle: 130200, ale: 22700 },
  { name: "Marketing CMS", businessUnit: "Marketing", criticality: "Tier 2", value: 180000, vulnPressure: 0.378, lef: 0.069, sle: 34200, ale: 2400 },
];

const vulnerabilities = [
  { cve: "CVE-2023-46604", title: "ActiveMQ RCE", impactedAsset: "Customer Database (PII)", cvss: 10, epss: 94, ageDays: 55, status: "open" },
  { cve: "CVE-2023-34362", title: "MOVEit Transfer SQLi", impactedAsset: "Regulatory Reporting DB", cvss: 9.8, epss: 91, ageDays: 8, status: "open" },
  { cve: "CVE-2024-3400", title: "PAN-OS command injection", impactedAsset: "Core Payment Gateway", cvss: 9.8, epss: 87, ageDays: 21, status: "open" },
  { cve: "CVE-2024-4577", title: "PHP CGI argument injection", impactedAsset: "IoT Manufacturing Sensors", cvss: 9.8, epss: 83, ageDays: 68, status: "open" },
  { cve: "CVE-2024-1709", title: "ConnectWise ScreenConnect", impactedAsset: "Customer Support Portal", cvss: 10, epss: 79, ageDays: 25, status: "in-progress" },
  { cve: "CVE-2024-21413", title: "Outlook MonikerLink", impactedAsset: "Trading Engine", cvss: 9.8, epss: 72, ageDays: 12, status: "in-progress" },
  { cve: "CVE-2024-27198", title: "TeamCity auth bypass", impactedAsset: "HR Payroll SaaS", cvss: 9.8, epss: 66, ageDays: 15, status: "open" },
  { cve: "CVE-2024-6387", title: "regreSSHion OpenSSH", impactedAsset: "Internal DevOps CI/CD", cvss: 8.1, epss: 61, ageDays: 44, status: "open" },
  { cve: "CVE-2024-30040", title: "Windows MSHTML bypass", impactedAsset: "Corporate Email (M365)", cvss: 8.8, epss: 55, ageDays: 30, status: "open" },
  { cve: "CVE-2024-32002", title: "Git RCE via submodules", impactedAsset: "Marketing CMS", cvss: 9, epss: 42, ageDays: 78, status: "open" },
];

const controls = [
  { name: "Privileged Access Management (PAM)", cost: 160000, efficacy: 60, framework: "NIST CSF 2.0", clause: "PR.AC-1" },
  { name: "Cloud CSPM continuous scan", cost: 75000, efficacy: 35, framework: "ISO 27001", clause: "A.12.6.1" },
  { name: "Security awareness training", cost: 30000, efficacy: 30, framework: "NIST CSF 2.0", clause: "PR.AT-1" },
  { name: "DLP for PII / financial data", cost: 140000, efficacy: 40, framework: "ISO 27001", clause: "A.13.2.1" },
  { name: "SIEM 24/7 SOC monitoring", cost: 180000, efficacy: 45, framework: "NIST CSF 2.0", clause: "DE.AE-3" },
  { name: "Immutable backups + 3-2-1", cost: 90000, efficacy: 25, framework: "NIST CSF 2.0", clause: "PR.IP-4" },
  { name: "Zero-Trust network segmentation", cost: 220000, efficacy: 50, framework: "CIS Controls v8", clause: "12" },
  { name: "Mandatory MFA rollout", cost: 60000, efficacy: 35, framework: "NIST CSF 2.0", clause: "PR.AC-7" },
];

const actors = ["compliance.bot", "a.patel@corp", "j.smith@corp", "soc.analyst", "system.scanner"];
const events = ["EDR alert resolved", "SIEM alert triaged", "Patch applied", "IAM policy updated", "MFA enrolled", "Access review passed", "Backup verified", "Vulnerability scan completed"];
const severities = ["info", "warning", "critical"];

function randomLogs(count) {
  const logs = [];
  let time = Date.now();
  for (let i = 0; i < count; i++) {
    time -= Math.floor(Math.random() * 3 * 60 * 60 * 1000);
    logs.push({
      actor: actors[Math.floor(Math.random() * actors.length)],
      event: events[Math.floor(Math.random() * events.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      timestamp: new Date(time),
    });
  }
  return logs;
}

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected. Seeding...");

  await Asset.deleteMany({});
  await Vulnerability.deleteMany({});
  await Control.deleteMany({});
  await AuditLog.deleteMany({});

  await Asset.insertMany(assets);
  await Vulnerability.insertMany(vulnerabilities);
  await Control.insertMany(controls);
  await AuditLog.insertMany(randomLogs(60));

  console.log("Seed complete!");
  process.exit();
}

seed();

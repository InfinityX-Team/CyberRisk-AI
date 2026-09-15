require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const riskRoutes = require("./routes/risk");
const investmentRoutes = require("./routes/investment");
const simulatorRoutes = require("./routes/simulator");
const complianceRoutes = require("./routes/compliance");
const aiRoutes = require("./routes/ai");
const reportsRoutes = require("./routes/reports");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", authMiddleware, dashboardRoutes);
app.use("/api/risk", authMiddleware, riskRoutes);
app.use("/api/investment", authMiddleware, investmentRoutes);
app.use("/api/simulator", authMiddleware, simulatorRoutes);
app.use("/api/compliance", authMiddleware, complianceRoutes);
app.use("/api/ai", authMiddleware, aiRoutes);
app.use("/api/reports", authMiddleware, reportsRoutes);

app.get("/", (req, res) => res.send("Cyber Risk Platform API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

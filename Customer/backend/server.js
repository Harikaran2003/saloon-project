require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const partnerRoutes = require("./routes/partnerRoutes");
const routes = require("./routes/index"); // Import all routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", routes);
app.use("/api/partner", partnerRoutes);

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI_PARTNER = process.env.MONGO_URI_PARTNER;

if (!MONGO_URI || !MONGO_URI_PARTNER) {
  console.error("❌ Error: MONGO_URI or MONGO_URI_PARTNER is not set in the .env file");
  process.exit(1);
}

// ✅ Connect to Main Database
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to Main MongoDB:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ Main MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ✅ Connect to Partner Database
const partnerDB = mongoose.createConnection(MONGO_URI_PARTNER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

partnerDB.on("connected", () => {
  console.log("✅ Connected to Partner MongoDB:", partnerDB.name);
});

partnerDB.on("error", (err) => {
  console.error("❌ Partner MongoDB Connection Error:", err.message);
});

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ status: "✅ Server is running!" });
});

// ✅ Start the Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Something went wrong on the server!" });
});

// ✅ Handle Uncaught Errors & Unhandled Rejections
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Promise Rejection:", reason);
});

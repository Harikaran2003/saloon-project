import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan"; // ✅ Import morgan for logging
import connectDB from "./config/db.js";
import authRoutes from "./routes/userRoutes.js";
import salonRoutes from "./routes/salonRoutes.js";
import Salondata from "./models/salonDetails.js";

dotenv.config();

const app = express();

// ✅ Connect to MongoDB before starting the server
connectDB();

// ✅ Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // ✅ Log requests in development mode
}

app.use(cors()); // CORS for frontend

// ✅ Increase Request Payload Limit (Fixes 413 Error)
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/salon", salonRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.post('/salonid',async(req,res)=>{
  

  const salonid = await Salondata.findOne({ email: req.body.email });
  console.log("got ",salonid._id.toString())
  res.status(200).json({ message: "Salon ID received", data: salonid._id.toString() });
})

app.post('/salondata',async(req,res)=>{
  const salonid = await Salondata.findOne({ email: req.body.email });
  console.log("got ",salonid._id.toString())
  res.status(200).json({ message: "Salon ID received", data: salonid });
})

// ✅ 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
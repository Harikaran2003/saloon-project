const express = require("express");
const router = express.Router();
const Salon = require("../models/partnerUser");

// ✅ Enhanced Salon Search (By City, Area, or Landmark)
router.get("/salons", async (req, res) => {
  try {
    const searchQuery = req.query.search?.trim() || "";

    if (!searchQuery) {
      return res.json([]); // No search input, return empty array
    }

    // ✅ Search in multiple address fields
    let salons = await Salon.find({
      $or: [
        { "address.area": { $regex: searchQuery, $options: "i" } },
        { "address.landmark": { $regex: searchQuery, $options: "i" } },
        { "address.city": { $regex: searchQuery, $options: "i" } },
      ],
    }).lean();

    console.log("Filtered Salons:", salons);
    res.json(salons);
  } catch (error) {
    console.error("Error fetching salons:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Fetch a single salon by ID (for Details.js)
router.get("/salons/:id", async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id).lean();
    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }
    res.json(salon);
  } catch (error) {
    console.error("Error fetching salon:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Fetch available time slots for a given salon and date
router.get("/salons/:id/timeslots", async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query; // Date should be passed as YYYY-MM-DD

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const salon = await Salon.findById(id).lean();
    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    // Fetch time slots based on the salon's working hours (Example)
    const availableSlots = salon.timeSlots?.[date] || ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM"];

    res.json({ timeSlots: availableSlots });
  } catch (error) {
    console.error("Error fetching time slots:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

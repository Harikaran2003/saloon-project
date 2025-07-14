import Salondata from "../models/salonDetails.js";


// Register a new salon
const registerSalon = async (req, res) => {
  try {
    const salonData = req.body;

    // Validate required fields
    if (!salonData.salonName || !salonData.ownerName || !salonData.email || !salonData.phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the email already exists
    const existingSalon = await Salondata.findOne({ email: salonData.email });
    if (existingSalon) {
      return res.status(400).json({ message: "Salon with this email already exists" });
    }

    // Create new salon document
    const newSalon = new Salondata(salonData);
    await newSalon.save();

    res.status(201).json({ message: "Salon registered successfully!", data: newSalon });
  } catch (error) {
    console.error("Error registering salon:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all salons
const getAllSalons = async (req, res) => {
  try {
    const salons = await Salondata.find();
    res.status(200).json(salons);
  } catch (error) {
    console.error("Error fetching salons:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get salon by ID
const getSalonById = async (req, res) => {
  try {
    const salon = await Salondata.findById(req.params.id);
    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }
    res.status(200).json(salon);
  } catch (error) {
    console.error("Error fetching salon:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update salon by ID
const updateSalon = async (req, res) => {
  try {
    const updatedSalon = await Salondata.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSalon) {
      return res.status(404).json({ message: "Salon not found" });
    }
    res.status(200).json({ message: "Salon updated successfully", data: updatedSalon });
  } catch (error) {
    console.error("Error updating salon:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete salon by ID
const deleteSalon = async (req, res) => {
  try {
    const deletedSalon = await Salondata.findByIdAndDelete(req.params.id);
    if (!deletedSalon) {
      return res.status(404).json({ message: "Salon not found" });
    }
    res.status(200).json({ message: "Salon deleted successfully" });
  } catch (error) {
    console.error("Error deleting salon:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// In your salon controller
export const getSalonEmailByUserEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Find the salon with the given email
    const salon = await Salondata.findOne({ email });

    if (!salon) {
      return res.status(404).json({ message: "Salon not found." });
    }

    res.json([salon]); // Returning an array so the frontend code can work as expected
  } catch (error) {
    console.error("Error fetching salon email:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export default { registerSalon, getAllSalons, getSalonById, updateSalon, deleteSalon, getSalonEmailByUserEmail };

import express from "express";
import salonController from "../controllers/salonController.js";
import {
  getAllBookings,
  acceptRejectBooking,
  getCompletedBookings,
  rejectBooking
} from "../controllers/bookingController.js"; // ✅ using named imports only

const router = express.Router();

// Route to register a new salon
router.post("/register", salonController.registerSalon);

// Route to get salon by email
router.get("/email/:email", salonController.getSalonEmailByUserEmail);

// Route to get all salons
router.get("/", salonController.getAllSalons);

// Route to get a single salon by ID
router.get("/:id", salonController.getSalonById);

// Route to update a salon by ID
router.put("/:id", salonController.updateSalon);

// Route to delete a salon by ID
router.delete("/:id", salonController.deleteSalon);

// Route to get all bookings (pending)
router.get("/getbooking", getAllBookings);

// Route to accept or reject a booking
router.put("/decide/:decision/:booking_id", acceptRejectBooking); // Handles both accept and reject

// Route to get completed bookings
router.get("/getSuccessbooking", getCompletedBookings);

// Route to reject a booking (optional separate route)
router.put("/bookings/:id/reject", rejectBooking); // Can be kept if needed for specific rejection logic

export default router;

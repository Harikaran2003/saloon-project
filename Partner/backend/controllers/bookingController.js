
// import SuccessBooking from "../models/successBooking.js"; // Import the success booking model

// Get all pending bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "pending" });
    res.status(200).json({ data: bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

// Accept or Reject a booking
export const acceptRejectBooking = async (req, res) => {
  const { decision, booking_id } = req.params;

  try {
    const booking = await Booking.findById(booking_id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (decision === "1") {
      // Accept the booking
      const successBooking = new SuccessBooking({
        customerName: booking.customerName,
        service: booking.service,
        time: booking.time,
        date: booking.date,
        bookedAt: booking.bookedAt,
        barber: booking.barber,
        price: booking.price,
        image: booking.image,
        status: "accepted",
      });

      await successBooking.save();

      // Delete the accepted booking from the pending list
      await Booking.findByIdAndDelete(booking_id);
    } else {
      // Reject the booking
      booking.status = "rejected";
      await booking.save();
    }

    // Update the counts for pending and completed bookings
    const pendingAppointments = await Booking.countDocuments({ status: "pending" });
    const completedAppointments = await SuccessBooking.countDocuments({});

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      pendingAppointments,
      completedAppointments,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking", error });
  }
};

// Get all completed bookings
export const getCompletedBookings = async (req, res) => {
  try {
    const completedBookings = await SuccessBooking.find({});
    res.status(200).json({ data: completedBookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching completed bookings", error });
  }
};

// Reject a specific booking (already moved to the booking model's reject logic above)
export const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking rejected', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

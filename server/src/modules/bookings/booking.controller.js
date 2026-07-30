import Booking from "#models/Booking.js";
import { generateTicketPDF } from "#utils/ticketPdf.js";

// Logged-in user's bookings
export const myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.session.user.id,
    })
      .populate("temple", "name")
      .populate("darshanType", "name fee")
      .populate("ticket")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully.",
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logged-in user's booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.session.user.id,
    })
      .populate("temple")
      .populate("darshanType")
      .populate("ticket");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { reason } = req.body;

    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.session.user.id,
    }).populate("ticket");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        message: "Ticket is already cancelled.",
      });
    }

    if (booking.isVisited) {
      return res.status(400).json({
        message: "Visited tickets cannot be cancelled.",
      });
    } 

    // Combine ticket date and slot start
    const darshanDateTime = new Date(booking.ticket.date);

    const [hours, minutes] = booking.ticket.slotStart
      .split(":")
      .map(Number);

    darshanDateTime.setHours(hours, minutes, 0, 0);

    const now = new Date();

    const hoursRemaining =
      (darshanDateTime - now) / (1000 * 60 * 60);

    let refundPercentage = 0;

    if (booking.isVisited) {
      refundPercentage = 0;
    }
    else if (hoursRemaining >= 24) {
      refundPercentage = 100;
    }
    else if (hoursRemaining >= 6) {
      refundPercentage = 50;
    }
    else {
      refundPercentage = 0;
    }

    const refundAmount =
      (booking.totalAmount * refundPercentage) / 100;

    booking.bookingStatus = "Cancelled";
    booking.cancellationReason = reason;
    booking.cancelledAt = new Date();

    booking.refundPercentage = refundPercentage;
    booking.refundAmount = refundAmount;

    booking.refundStatus =
      refundPercentage > 0
        ? "Pending"
        : "Not Applicable";

    booking.ticket.availableSeats += booking.quantity;
    await booking.ticket.save();

    await booking.save();

    res.status(200).json({
      message: "Ticket cancelled successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel ticket.",
      error: error.message,
    });
  }
};

export const downloadTicket = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.session.user.id,
    })
      .populate("temple")
      .populate("darshanType")
      .populate("ticket");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const pdf = await generateTicketPDF(booking);

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${booking.bookingNumber}.pdf`
    );

    res.send(pdf);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
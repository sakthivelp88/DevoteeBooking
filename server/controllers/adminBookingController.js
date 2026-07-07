import Booking from "../models/Booking.js";

import {
  getBookings,
  getBookingById,
  updateBookingStatus,
} from "../services/adminBookingService.js";


// Admin - Booking List
export const getAdminBookings = async (req, res) => {
  try {
    const result = await getBookings(req.query);

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully.",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin - Booking Details
export const getAdminBookingById = async (req, res) => {
  try {
    const booking = await getBookingById(req.params.id);

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

// Admin - Update Booking Status
export const updateAdminBookingStatus = async (req, res) => {
  try {
    const booking = await updateBookingStatus(
      req.params.id,
      req.body
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully.",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
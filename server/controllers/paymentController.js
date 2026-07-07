import crypto from "crypto";

import razorpay from "../config/razorpay.js";
import Ticket from "../models/Ticket.js";
import Booking from "../models/Booking.js";
import Reservation from "../models/Reservation.js";

export const createOrder = async (req, res) => {
  try {
    const {
      ticketId,
      quantity,
      contact,
      devotees,
    } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    if (ticket.availableSeats < quantity) {
      return res.status(400).json({
        message: "Seats unavailable",
      });
    }

    const expiresAt =
      new Date(
        Date.now() +
        15 * 60 * 1000
      );

    const amount =
      ticket.price * quantity;

    const order =
      await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
      });

    const reservation = await Reservation.create({
      userId: req.session.user.id,
      ticketId,
      quantity,
      contact,
      devotees,
      orderId: order.id,
      expiresAt,
    });

    return res.json({
      order,
      reservation,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const reservation =
      await Reservation.findOne({
        orderId: razorpay_order_id,
      });

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    const existingBooking =
      await Booking.findOne({
        razorpayOrderId:
          razorpay_order_id,
      });

    if (existingBooking) {
      return res.json({
        success: true,
        booking: existingBooking,
      });
    }

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(body)
        .digest("hex");

    if (
      expectedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        message:
          "Payment verification failed",
      });
    }

    const ticket =
      await Ticket.findById(
        reservation.ticketId
      );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const amount =
      ticket.price *
      reservation.quantity;

    if (ticket.availableSeats < reservation.quantity) {
      return res.status(400).json({
        message: "Seats are no longer available",
      });
    }

    ticket.availableSeats -= reservation.quantity;

    if (ticket.availableSeats === 0) {
      ticket.status = "Sold Out";
    }

    await ticket.save();

    const booking = await Booking.create({
      user: reservation.userId,
      temple: ticket.temple,
      darshanType: ticket.darshanType,
      ticket: ticket._id,
      reservation: reservation._id,

      contact: reservation.contact,
      devotees: reservation.devotees,

      quantity: reservation.quantity,
      ticketPrice: ticket.price,
      totalAmount: amount,

      paymentStatus: "Paid",
      bookingStatus: "Confirmed",

      paymentReference: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    reservation.status = "CONFIRMED";
    reservation.paymentStatus = "SUCCESS";

    await reservation.save();

    res.status(200).json({
      success: true,
      message: "Booking confirmed successfully",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
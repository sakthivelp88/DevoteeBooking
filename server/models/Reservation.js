import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    orderId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "LOCKED",
        "CONFIRMED",
        "CANCELLED",
        "EXPIRED",
      ],
      default: "LOCKED",
    },

    paymentStatus: {
      type: String,
      enum: [
        "PENDING",
        "SUCCESS",
        "FAILED",
        "REFUNDED",
      ],
      default: "PENDING",
    },

    expiresAt: {
      type: Date,
      required: true,
    },
    contact: {
      type: Object,
      required: true,
    },

    devotees: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Reservation", reservationSchema);
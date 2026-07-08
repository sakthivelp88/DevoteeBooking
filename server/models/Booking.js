import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      default: () => `BK-${Date.now()}`,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple",
      required: true,
    },

    darshanType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DarshanType",
      required: true,
    },

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      default: null,
    },

    contact: {
      mobile: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },
    },

    devotees: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        age: {
          type: Number,
          required: true,
          min: 1,
        },

        gender: {
          type: String,
          enum: ["Male", "Female", "Other"],
          required: true,
        },

        idProof: {
          type: String,
          default: "",
          trim: true,
        }
      }
    ],

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    ticketPrice: {
      type: Number,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      default: "Razorpay",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    bookingStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Cancelled",
        "Completed",
      ],
      default: "Pending",
    },

    paymentReference: {
      type: String,
      default: "",
    },

    razorpayOrderId: {
      type: String,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    qrCode: {
      type: String,
      default: "",
    },
    isVisited: {
      type: Boolean,
      default: false,
    },

    visitedAt: {
      type: Date,
      default: null,
    },
    
    remarks: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true,
  }
);

/* -------------------- Middleware -------------------- */

bookingSchema.index({
  bookingStatus: 1
});

bookingSchema.index({
  paymentStatus: 1
});

bookingSchema.index({
  createdAt: -1
});

export default mongoose.model("Booking", bookingSchema);
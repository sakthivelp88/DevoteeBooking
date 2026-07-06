import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
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

    date: {
      type: Date,
      required: true,
    },

    slotStart: {
      type: String,
      required: true,
    },

    slotEnd: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    availableSeats: {
      type: Number,
      min: 0,
    },

    bookingStart: {
      type: Date,
    },

    bookingEnd: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Active", "Closed", "Sold Out"],
      default: "Active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* -------------------- Middleware -------------------- */

ticketSchema.pre("save", function () {
  // Initialize available seats
  if (this.isNew && this.availableSeats == null) {
    this.availableSeats = this.totalSeats;
  }

  // Validate seats
  if (this.availableSeats > this.totalSeats) {
    throw new Error(
      "Available seats cannot exceed total seats."
    );
  }

  // Validate booking dates
  if (
    this.bookingStart &&
    this.bookingEnd &&
    this.bookingEnd <= this.bookingStart
  ) {
    throw new Error(
      "Booking end date must be after booking start date."
    );
  }

  // Auto update status
  if (this.availableSeats === 0) {
    this.status = "Sold Out";
  } else if (this.status !== "Closed") {
    this.status = "Active";
  }
});

/* --------------------- Virtuals ---------------------- */

ticketSchema.virtual("bookedSeats").get(function () {
  return this.totalSeats - this.availableSeats;
});

/* ---------------------- Indexes ---------------------- */

// Prevent duplicate ticket slots
ticketSchema.index(
  {
    temple: 1,
    darshanType: 1,
    date: 1,
    slotStart: 1,
    slotEnd: 1,
  },
  {
    unique: true,
  }
);

// Faster filtering
ticketSchema.index({
  temple: 1,
  date: 1,
});

export default mongoose.model("Ticket", ticketSchema);
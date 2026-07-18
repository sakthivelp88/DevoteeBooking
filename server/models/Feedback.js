import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple"
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 2,
    },

    status: {
      type: String,
      enum: ["Pending", "Reviewed"],
      default: "Pending",
    },
    
    repliedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Feedback", feedbackSchema);
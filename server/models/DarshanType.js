import mongoose from "mongoose";

const darshanTypeSchema = new mongoose.Schema(
  {
    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    fee: {
      type: Number,
      required: true,
      default: 0,
    },

    maxBookingPerUser: {
      type: Number,
      default: 6
    },

    minimumAge: Number,

    onlineBooking: {
      type: Boolean,
      default: true
    },

    duration: {
      type: String,
      default: "",
    },

    reportingTime: {
      type: String,
      default: "",
    },

    features: [
      {
        type: String,
      },
    ],

    bestFor: {
      type: String,
      default: "",
    },

    dressCode: {
      type: String,
      default: "",
    },

    isRecommended: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DarshanType", darshanTypeSchema);
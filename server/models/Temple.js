import mongoose from "mongoose";

const templeSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Location
    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    // Images
    image: {
      type: String,
      required: true,
    },

    banner: {
      type: String,
      default: "",
    },

    gallery: [
      {
        type: String,
      },
    ],

    templeCode: {
      type: String,
      unique: true,
    },

    // Description
    shortDescription: {
      type: String,
      maxlength: 250,
    },

    history: {
      type: String,
    },

    // Temple Information
    deity: {
      type: String,
    },

    builtYear: {
      type: String,
    },

    architecture: {
      type: String,
    },

    famousFor: [
      {
        type: String,
      },
    ],

    // Visitor Information
    timings: {
      type: String,
    },

    dressCode: {
      type: String,
    },

    entryFee: {
      type: Number,
      default: 0,
    },

    parkingAvailable: {
      type: Boolean,
      default: false,
    },

    wheelchairAccess: {
      type: Boolean,
      default: false,
    },

    // Contact
    website: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    // Home Page
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Status
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    coordinates: {
      latitude: Number,
      longitude: Number
    },

    socialLinks: {
      facebook: String,
      instagram: String,
      youtube: String
    },

    seo: {
      metaTitle: String,
      metaDescription: String
    },

    averageRating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Temple", templeSchema);
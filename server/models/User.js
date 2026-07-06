import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["admin", "devotee"],
      default: "devotee"
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },

    provider: {
      type: String,
      default: "local"
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "User",
  userSchema
);
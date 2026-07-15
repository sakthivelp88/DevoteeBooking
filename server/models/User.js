import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 10,
    },

    password: {
      type: String,
      required: true,
      minlength: 10,
    },

    profileImage: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["admin", "devotee"],
      default: "devotee",
    },

    status: {
      type: String,
      enum: ["active", "blocked"],      
      default: "active",
    },

    blockedAt: {
      type: Date,
    },

    blockedReason: {
      type: String,
      trim: true,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "light",
    },

    notificationSettings: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
      push: {
        type: Boolean,
        default: true,
      },
    },

    lastLogin: {
      type: Date,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware 
userSchema.index({ role: 1 });

const User = mongoose.model("User", userSchema);

export default User;


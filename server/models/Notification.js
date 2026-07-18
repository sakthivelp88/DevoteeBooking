import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "booking",
        "refund",
        "feedback",
        "announcement",
        "remark",
        "general",
      ],
      default: "general",
    },

    audience: {
      type: String,
      enum: [
        "single",
        "devotees",
        "admins",
        "all",
      ],
      default: "single",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    relatedBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },

    campaignId: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: [
        "low",
        "normal",
        "high",
        "urgent",
      ],
      default: "normal",
    },

    status: {
      type: String,
      enum: [
        "draft",
        "scheduled",
        "sent",
        "cancelled",
        "failed",
      ],
      default: "draft",
    },

    scheduledAt: {
      type: Date,
      default: null,
    },

    sentAt: {
      type: Date,
      default: null,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },

    // action: String,
    // image: String,

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    deliveryLogs: [
      {
        channel: String,
        status: String,
        sentAt: Date,
        reason: String
      }
    ],
    
    isArchived: {
      type: Boolean,
      default: false
    },

    deliveryChannel: {
      type: [{
        type: String,
        enum: ["in_app", "email", "sms", "push"],
      }],
      default: ["in_app"],
    },

    deliveryStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "delivered",
        "failed",
        "cancelled",
      ],
      default: "pending",
    },

    failureReason: {
      type: String,
      default: null,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ user: 1 });
notificationSchema.index({ audience: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({
  status: 1,
  isDeleted: 1,
  scheduledAt: 1,
});
notificationSchema.index({ priority: 1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ campaignId: 1 });
notificationSchema.index({
  title: "text",
  message: "text",
});

export default mongoose.model("Notification", notificationSchema);
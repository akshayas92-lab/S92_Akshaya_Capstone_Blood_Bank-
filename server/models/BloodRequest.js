const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    unitsRequired: {
      type: Number,
      required: true,
      min: 1,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "fulfilled", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
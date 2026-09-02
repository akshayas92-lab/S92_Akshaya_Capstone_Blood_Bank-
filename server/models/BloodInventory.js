const mongoose = require("mongoose");

const bloodInventorySchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
      unique: true,
    },
    unitsAvailable: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BloodInventory", bloodInventorySchema);
const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    location: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    lastDonationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donor", donorSchema);
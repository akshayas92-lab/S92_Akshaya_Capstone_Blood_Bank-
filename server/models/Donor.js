```js
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

// Relationship: One Donor can have many BloodRequests
donorSchema.virtual("bloodRequests", {
  ref: "BloodRequest",
  localField: "_id",
  foreignField: "donor",
});

donorSchema.set("toJSON", { virtuals: true });
donorSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Donor", donorSchema);
```

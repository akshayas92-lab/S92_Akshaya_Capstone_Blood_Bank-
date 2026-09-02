require("dns").setServers(["8.8.8.8"]);
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const BloodInventory = require("./models/BloodInventory");

const app = express();

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// WRITE - Add blood inventory
app.post("/api/blood-inventory", async (req, res) => {
  try {
    const { bloodGroup, unitsAvailable } = req.body;

    const blood = new BloodInventory({
      bloodGroup,
      unitsAvailable,
    });

    const savedBlood = await blood.save();

    res.status(201).json(savedBlood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get all blood inventory
app.get("/api/blood-inventory", async (req, res) => {
  try {
    const blood = await BloodInventory.find();

    res.status(200).json(blood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get blood inventory by blood group
app.get("/api/blood-inventory/:bloodGroup", async (req, res) => {
  try {
    const blood = await BloodInventory.find({
      bloodGroup: req.params.bloodGroup,
    });

    res.status(200).json(blood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
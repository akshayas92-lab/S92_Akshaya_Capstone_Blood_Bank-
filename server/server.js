
const dns = require("dns");
dns.setServers(["8.8.8.8"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const BloodInventory = require("./models/BloodInventory");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

console.log(
  "MongoDB URI loaded:",
  process.env.MONGODB_URI ? "YES" : "NO"
);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");
    console.log("MongoDB state:", mongoose.connection.readyState);

    // POST API
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
        console.error("POST error:", error.message);

        res.status(500).json({
          error: error.message,
        });
      }
    });

    // GET API - Get all blood inventory
    app.get("/api/blood-inventory", async (req, res) => {
      try {
        const blood = await BloodInventory.find();

        res.status(200).json(blood);
      } catch (error) {
        console.error("GET error:", error.message);

        res.status(500).json({
          error: error.message,
        });
      }
    });

    // GET API - Get by blood group
    app.get("/api/blood-inventory/:bloodGroup", async (req, res) => {
      try {
        const blood = await BloodInventory.find({
          bloodGroup: req.params.bloodGroup,
        });

        res.status(200).json(blood);
      } catch (error) {
        console.error("GET by blood group error:", error.message);

        res.status(500).json({
          error: error.message,
        });
      }
    });

    // PUT API - Update blood inventory
    app.put("/api/blood-inventory/:id", async (req, res) => {
      try {
        const { bloodGroup, unitsAvailable } = req.body;

        const updatedBlood = await BloodInventory.findByIdAndUpdate(
          req.params.id,
          {
            bloodGroup,
            unitsAvailable,
          },
          {
            new: true,
            runValidators: true,
          }
        );

        if (!updatedBlood) {
          return res.status(404).json({
            message: "Blood inventory not found",
          });
        }

        res.status(200).json(updatedBlood);
      } catch (error) {
        console.error("PUT error:", error.message);

        res.status(500).json({
          error: error.message,
        });
      }
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

startServer();
```

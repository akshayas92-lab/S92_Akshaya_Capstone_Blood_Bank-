const dns = require("dns");

dns.setServers(["8.8.8.8"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const BloodInventory = require("./models/BloodInventory");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

console.log(
  "MongoDB URI loaded:",
  process.env.MONGODB_URI ? "YES" : "NO"
);

async function startServer() {
  try {
    // =========================
    // CONNECT TO MONGODB
    // =========================

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");
    console.log("MongoDB state:", mongoose.connection.readyState);

    // =========================
    // POST API
    // ADD INVENTORY
    // =========================

    app.post("/api/blood-inventory", async (req, res) => {
      try {
        const { bloodGroup, unitsAvailable } = req.body;

        if (!bloodGroup || unitsAvailable === undefined) {
          return res.status(400).json({
            error: "Blood group and units available are required",
          });
        }

        const units = Number(unitsAvailable);

        if (Number.isNaN(units)) {
          return res.status(400).json({
            error: "Units available must be a number",
          });
        }

        if (units < 0) {
          return res.status(400).json({
            error: "Units cannot be negative",
          });
        }

        const blood = new BloodInventory({
          bloodGroup: bloodGroup,
          unitsAvailable: units,
          lastUpdated: new Date(),
        });

        const savedBlood = await blood.save();

        return res.status(201).json(savedBlood);
      } catch (error) {
        console.error("POST error:", error.message);

        return res.status(500).json({
          error: error.message,
        });
      }
    });

    // =========================
    // GET ALL INVENTORY
    // =========================

    app.get("/api/blood-inventory", async (req, res) => {
      try {
        const blood = await BloodInventory.find();

        return res.status(200).json(blood);
      } catch (error) {
        console.error("GET error:", error.message);

        return res.status(500).json({
          error: error.message,
        });
      }
    });

    // =========================
    // GET BY BLOOD GROUP
    // =========================

    app.get(
      "/api/blood-inventory/group/:bloodGroup",
      async (req, res) => {
        try {
          const blood = await BloodInventory.find({
            bloodGroup: req.params.bloodGroup,
          });

          return res.status(200).json(blood);
        } catch (error) {
          console.error(
            "GET by blood group error:",
            error.message
          );

          return res.status(500).json({
            error: error.message,
          });
        }
      }
    );

    // =========================
    // PUT API
    // UPDATE INVENTORY
    // =========================

    app.put("/api/blood-inventory/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { unitsAvailable } = req.body;

        console.log("==============================");
        console.log("PUT REQUEST RECEIVED");
        console.log("ID:", id);
        console.log("New units:", unitsAvailable);
        console.log("==============================");

        // Check ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
            error: "Invalid inventory ID",
          });
        }

        // Check units
        if (unitsAvailable === undefined) {
          return res.status(400).json({
            error: "unitsAvailable is required",
          });
        }

        const units = Number(unitsAvailable);

        if (Number.isNaN(units)) {
          return res.status(400).json({
            error: "unitsAvailable must be a number",
          });
        }

        if (units < 0) {
          return res.status(400).json({
            error: "Units cannot be negative",
          });
        }

        // Find and update
        const updatedBlood =
          await BloodInventory.findByIdAndUpdate(
            id,
            {
              $set: {
                unitsAvailable: units,
                lastUpdated: new Date(),
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );

        // Inventory not found
        if (!updatedBlood) {
          return res.status(404).json({
            error: "Blood inventory not found",
          });
        }

        console.log("UPDATED INVENTORY:");
        console.log(updatedBlood);

        return res.status(200).json(updatedBlood);
      } catch (error) {
        console.error("PUT error:", error);

        return res.status(500).json({
          error: error.message,
        });
      }
    });

    // =========================
    // DELETE API
    // DELETE INVENTORY
    // =========================

    app.delete("/api/blood-inventory/:id", async (req, res) => {
      try {
        const { id } = req.params;

        console.log("==============================");
        console.log("DELETE REQUEST RECEIVED");
        console.log("ID:", id);
        console.log("==============================");

        // Check ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
            error: "Invalid inventory ID",
          });
        }

        const deletedBlood =
          await BloodInventory.findByIdAndDelete(id);

        // Inventory not found
        if (!deletedBlood) {
          return res.status(404).json({
            error: "Blood inventory not found",
          });
        }

        console.log("DELETED INVENTORY:");
        console.log(deletedBlood);

        return res.status(200).json({
          message: "Blood inventory deleted successfully",
          deletedBlood: deletedBlood,
        });
      } catch (error) {
        console.error("DELETE error:", error);

        return res.status(500).json({
          error: error.message,
        });
      }
    });

    // =========================
    // START SERVER
    // =========================

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  }
}

// =========================
// START APPLICATION
// =========================

startServer();
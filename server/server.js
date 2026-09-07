const dns = require("dns");

dns.setServers(["8.8.8.8"]);

require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const BloodInventory = require("./models/BloodInventory");
const User = require("./models/User");

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
    // REGISTER API
    // USERNAME + PASSWORD
    // =========================

    app.post("/api/auth/register", async (req, res) => {
      try {
        const {
          username,
          password,
          name,
          email,
          phone,
          role,
        } = req.body;

        if (!username || !password || !name || !email || !phone) {
          return res.status(400).json({
            error:
              "Username, password, name, email and phone are required",
          });
        }

        const cleanUsername = username.trim();
        const cleanEmail = email.trim().toLowerCase();

        // Check duplicate username or email
        const existingUser = await User.findOne({
          $or: [
            { username: cleanUsername },
            { email: cleanEmail },
          ],
        });

        if (existingUser) {
          return res.status(409).json({
            error: "Username or email already exists",
          });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
          username: cleanUsername,
          password: hashedPassword,
          name: name.trim(),
          email: cleanEmail,
          phone: phone.trim(),
          role: role || "recipient",
        });

        const savedUser = await user.save();

        return res.status(201).json({
          message: "User registered successfully",
          user: {
            id: savedUser._id,
            username: savedUser.username,
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
            role: savedUser.role,
          },
        });
      } catch (error) {
        console.error("REGISTER error:", error);

        return res.status(500).json({
          error: error.message,
        });
      }
    });

    // =========================
    // LOGIN API
    // USERNAME + PASSWORD
    // =========================

    app.post("/api/auth/login", async (req, res) => {
      try {
        const { username, password } = req.body;

        if (!username || !password) {
          return res.status(400).json({
            error: "Username and password are required",
          });
        }

        const user = await User.findOne({
          username: username.trim(),
        });

        if (!user) {
          return res.status(401).json({
            error: "Invalid username or password",
          });
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatch) {
          return res.status(401).json({
            error: "Invalid username or password",
          });
        }

        return res.status(200).json({
          message: "Login successful",
          user: {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
        });
      } catch (error) {
        console.error("LOGIN error:", error);

        return res.status(500).json({
          error: error.message,
        });
      }
    });

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

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
            error: "Invalid inventory ID",
          });
        }

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

        if (!updatedBlood) {
          return res.status(404).json({
            error: "Blood inventory not found",
          });
        }

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

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
            error: "Invalid inventory ID",
          });
        }

        const deletedBlood =
          await BloodInventory.findByIdAndDelete(id);

        if (!deletedBlood) {
          return res.status(404).json({
            error: "Blood inventory not found",
          });
        }

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
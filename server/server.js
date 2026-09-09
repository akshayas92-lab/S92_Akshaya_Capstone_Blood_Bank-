const dns = require("dns");

dns.setServers(["8.8.8.8"]);

require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const BloodInventory = require("./models/BloodInventory");
const User = require("./models/User");

const app = express();

// =========================
// MULTER FILE UPLOAD SETUP
// =========================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

// =========================
// JWT AUTHORIZATION MIDDLEWARE
// =========================

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Access token required",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: "Invalid or expired token",
      });
    }

    req.user = user;
    next();
  });
};

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

        const hashedPassword = await bcrypt.hash(password, 10);

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
    // USERNAME + PASSWORD + JWT
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

        const token = jwt.sign(
          {
            userId: user._id,
            username: user.username,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        return res.status(200).json({
          message: "Login successful",
          token,
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
    // FILE UPLOAD API
    // =========================

    app.post(
      "/api/upload",
      upload.single("file"),
      (req, res) => {
        try {
          if (!req.file) {
            return res.status(400).json({
              error: "No file uploaded",
            });
          }

          return res.status(200).json({
            message: "File uploaded successfully",
            file: {
              filename: req.file.filename,
              originalName: req.file.originalname,
              path: `/uploads/${req.file.filename}`,
              size: req.file.size,
            },
          });
        } catch (error) {
          console.error("FILE UPLOAD error:", error);

          return res.status(500).json({
            error: error.message,
          });
        }
      }
    );

    // =========================
    // POST API
    // ADD INVENTORY
    // JWT PROTECTED
    // =========================

    app.post(
      "/api/blood-inventory",
      authenticateToken,
      async (req, res) => {
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
      }
    );

    // =========================
    // GET ALL INVENTORY
    // JWT PROTECTED
    // =========================

    app.get(
      "/api/blood-inventory",
      authenticateToken,
      async (req, res) => {
        try {
          const blood = await BloodInventory.find();

          return res.status(200).json(blood);
        } catch (error) {
          console.error("GET error:", error.message);

          return res.status(500).json({
            error: error.message,
          });
        }
      }
    );

    // =========================
    // GET BY BLOOD GROUP
    // JWT PROTECTED
    // =========================

    app.get(
      "/api/blood-inventory/group/:bloodGroup",
      authenticateToken,
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
    // JWT PROTECTED
    // =========================

    app.put(
      "/api/blood-inventory/:id",
      authenticateToken,
      async (req, res) => {
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
      }
    );

    // =========================
    // DELETE API
    // DELETE INVENTORY
    // JWT PROTECTED
    // =========================

    app.delete(
      "/api/blood-inventory/:id",
      authenticateToken,
      async (req, res) => {
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
      }
    );

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
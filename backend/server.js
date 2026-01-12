const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const reportRoutes = require("./routes/report.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", reportRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Disease Warning Backend is running");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

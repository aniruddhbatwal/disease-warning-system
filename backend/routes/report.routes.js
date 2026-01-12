const express = require("express");
const router = express.Router();
const Report = require("../models/report.model");
const axios = require("axios");

// POST: Submit symptom report
router.post("/report", async (req, res) => {
  try {
    const { lat, lng, pincode, symptoms } = req.body;

    if (!lat || !lng || !pincode || !symptoms) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!Array.isArray(symptoms)) {
      return res.status(400).json({ message: "Symptoms must be an array" });
    }

    const newReport = new Report({ lat, lng, pincode, symptoms });
    await newReport.save();

    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch all reports
router.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});

// GET: Fetch analyzed risk data
router.get("/risk-data", async (req, res) => {
  try {
    const reports = await Report.find().lean();
    const response = await axios.post(
      "http://127.0.0.1:8000/analyze",
      reports
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Analytics error:", error.message);
    res.status(500).json({ message: "Failed to analyze risk data" });
  }
});

module.exports = router;

const PrayerLog = require("../models/prayerLogModel");
const mongoose = require("mongoose");

// Log Completed Prayer
const logPrayer = async (req, res) => {
  try {
      const { userId, prayerName, completedAt } = req.body;

      // Check if all required fields are provided
      if (!userId || !prayerName || !completedAt) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      // Convert completedAt to Date object
      const completedAtDate = new Date(completedAt);

      // Check if MongoDB is connected
      if (!mongoose.connection.readyState) {
          return res.status(500).json({ error: "Database connection issue" });
      }

      // Save the new log
      const newLog = new PrayerLog({ userId, prayerName, completedAt: completedAtDate });
      await newLog.save();

      res.status(201).json({ message: "Prayer logged successfully", newLog });
  } catch (error) {
      console.error("Error logging prayer:", error.message);
      res.status(500).json({ error: "Failed to log prayer" });
  }
};

// Get User's Prayer Logs
const getPrayerLogs = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId query parameter" });
    }

    const logs = await PrayerLog.find({ userId });
    res.json(logs);
  } catch (error) {
    console.error("Error fetching prayer logs:", error.message);
    res.status(500).json({ error: "Failed to fetch prayer logs" });
  }
};

module.exports = { logPrayer, getPrayerLogs };

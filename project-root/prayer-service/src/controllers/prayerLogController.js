const PrayerLog = require("../models/prayerLogModel");

// Log Completed Prayer
const logPrayer = async (req, res) => {
  try {
    const { userId, prayerName, completedAt } = req.body;

    if (!userId || !prayerName || !completedAt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newLog = new PrayerLog({ userId, prayerName, completedAt });
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

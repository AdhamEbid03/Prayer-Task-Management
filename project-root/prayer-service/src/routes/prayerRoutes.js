const express = require("express");
const { getPrayerTimes } = require("../controllers/prayerController");
const { logPrayer, getPrayerLogs } = require("../controllers/prayerLogController");

const router = express.Router();

// Fetch prayer times
router.get("/", getPrayerTimes);

// Log completed prayer
router.post("/logPrayer", logPrayer);

// Get user prayer logs
router.get("/log", getPrayerLogs);

module.exports = router;

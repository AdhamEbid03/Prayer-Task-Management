const mongoose = require("mongoose");

const PrayerLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  prayerName: { type: String, required: true },
  completedAt: { type: Date, required: true }
});

module.exports = mongoose.model("PrayerLog", PrayerLogSchema);

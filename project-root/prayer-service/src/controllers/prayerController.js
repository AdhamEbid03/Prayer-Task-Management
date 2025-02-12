const axios = require("axios");

// Fetch Prayer Times Based on User Location
const getPrayerTimes = async (req, res) => {
  try {
    const { city = "London", country = "United Kingdom" } = req.query;
    const PRAYER_API_URL = "https://api.aladhan.com/v1/timingsByCity";

    const response = await axios.get(PRAYER_API_URL, {
      params: { city, country },
    });

    const prayerTimes = response.data.data.timings;
    res.json({ city, country, prayerTimes });
  } catch (error) {
    console.error("Error fetching prayer times:", error.message);
    res.status(500).json({ error: "Failed to fetch prayer times" });
  }
};

module.exports = { getPrayerTimes };

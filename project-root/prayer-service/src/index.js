require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const prayerRoutes = require("./routes/prayerRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/prayers", prayerRoutes);

app.listen(PORT, () => {
  console.log(`Prayer Service running on http://localhost:${PORT}`);
});

// app.get("/", (req, res) => {
//     res.redirect("/prayers");
//   });
app.get("/prayers", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 👈 Ensures CORS is applied
  res.json({
      Fajr: "05:30 AM",
      Dhuhr: "12:30 PM",
      Asr: "03:45 PM",
      Maghrib: "06:15 PM",
      Isha: "07:45 PM"
  });
});

// app.use(cors({
//     origin: "http://localhost:8080", // Allow frontend
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// }));

//app.use(cors({ origin: "*" }));
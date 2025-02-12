require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const prayerRoutes = require("./routes/prayerRoutes");

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

app.get("/", (req, res) => {
    res.redirect("/prayers");
  });
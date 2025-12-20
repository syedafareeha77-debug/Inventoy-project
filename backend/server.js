const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------
// MongoDB connection
// ------------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
};

connectDB();

// ------------------------
// Routes Import
// ------------------------
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const stockRoutes = require("./routes/stock"); // Stock route added

// ------------------------
// Routes Setup
// ------------------------
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes); // Stock route setup

// ------------------------
// Test Route
// ------------------------
app.get("/", (req, res) => {
  res.send("Server running");
});

// ------------------------
// Start Server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


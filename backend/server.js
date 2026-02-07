const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.route");
const cartRoutes = require("./routes/cart.route");
const productsRoutes = require("./routes/products.route");
const otpRoutes = require("./routes/otp.route");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- ROUTES ----------
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/otp", otpRoutes);

// ✅ ADD THIS
app.get("/api/otp/test", (req, res) => {
  res.send("OTP route working ✅");
});

// ---------- HEALTH ----------
app.get("/health", (req, res) => {
  res.json({ message: "Server is healthy 🚀" });
});

// ---------- DATABASE ----------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

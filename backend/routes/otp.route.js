const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Temporary OTP store
const otpStore = {}; // { email: otp }

// Generate 4 digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

// ================= SEND OTP =================
router.post("/send", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = generateOTP();
  otpStore[email] = otp;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    console.log("OTP sent:", otp);
    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("OTP email error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// ================= VERIFY OTP =================
router.post("/verify", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  if (otpStore[email] && otpStore[email] === parseInt(otp)) {
    delete otpStore[email];
    return res.json({ message: "OTP verified successfully" });
  }

  res.status(400).json({ message: "Invalid OTP" });
});

module.exports = router;

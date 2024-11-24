import express from "express";
import Booking from "../models/Booking";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Request body received:", req.body); // Log gautą užklausos turinį

    const { businessId, date, time, userEmail, userName, status } = req.body;

    if (!businessId || !date || !time || !userEmail || !userName || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = new Booking(req.body);
    await newBooking.save();

    console.log("Booking created successfully:", newBooking);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(400).json({
      message: "Error creating booking",
      error: (err as Error)?.message ?? err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err); // Log error
    res
      .status(500)
      .json({ message: "Error fetching bookings for the user", error: err });
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    const userBookings = await Booking.find({ userEmail: req.params.email });
    res.json(userBookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err); // Log error
    res
      .status(500)
      .json({ message: "Error fetching bookings for the user", error: err });
  }
});

export default router;

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const authMiddleware = require('../middleware/auth');

router.post('/bookings', authMiddleware, async (req, res) => {
  const { tourId, travelers, travelDate, paymentMethod } = req.body;

  if (!tourId || !travelers || !travelDate || !paymentMethod) {
    return res.status(400).json({ msg: 'Missing booking info' });
  }

  try {
    // Find tour by custom tourCode string
    const tour = await Tour.findOne({ tourCode: tourId });
    if (!tour) return res.status(404).json({ msg: 'Tour not found' });

    // Use tour._id (ObjectId) in booking
    const booking = new Booking({
      user: req.user.id,
      tour: tour._id,            // <--- IMPORTANT: use MongoDB ObjectId here
      travelers,
      travelDate,
      totalAmount: tour.basePrice * travelers,
      paymentMethod,
      paymentStatus: 'completed' // or your payment logic
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;



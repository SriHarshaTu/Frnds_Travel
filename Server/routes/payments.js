const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// Get tour by ID
router.get('/tour/:id', async (req, res) => {
  console.log('🔍 Looking for tour with code:', req.params.id);
  try {
    const tour = await Tour.findOne({ tourCode: req.params.id });
    if (!tour) {
      return res.status(404).json({ msg: 'Tour not found' });
    }
    res.json(tour);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  const { tourId, travelers, travelDate, paymentMethod } = req.body;
  // Validate input
    if (!tourId || !travelers || !travelDate || !paymentMethod) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }
  try {
    const tour = await Tour.findOne({ tourCode: tourId });
    if (!tour) {
      return res.status(404).json({ msg: 'Tour not found' });
    }
    
    const booking = new Booking({
      user: req.user.id,
      tour: tourId,
      travelers,
      travelDate,
      totalAmount: tour.basePrice * travelers,
      paymentMethod,
      paymentStatus: 'completed' // Assuming immediate payment confirmation
    });
    
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
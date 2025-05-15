const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');

// @route   GET /api/tours
// @desc    Get all tours
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/tours/:id
// @desc    Get single tour
router.get('/:tourCode', async (req, res) => {
  try {
    const tour = await Tour.findOne({ tourCode: req.params.tourCode });

    
    if (!tour) {
      return res.status(404).json({ msg: 'Tour not found' });
    }

    res.json(tour);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const flightsData = require('../data/flights.json'); // your flights JSON data

router.get('/', (req, res) => {
  const { from, to, date } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({ msg: 'Missing query params: from, to, date' });
  }

  // Filter flights based on from and to city (case insensitive)
  const filteredFlights = flightsData.filter(flight =>
    flight.from.toLowerCase() === from.toLowerCase() &&
    flight.to.toLowerCase() === to.toLowerCase() &&
    flight.date === date // assuming date is string in YYYY-MM-DD format in your data
  );

  if (filteredFlights.length === 0) {
    return res.status(404).json({ msg: 'No flights found for the given criteria' });
  }

  res.json(filteredFlights);
});

module.exports = router;


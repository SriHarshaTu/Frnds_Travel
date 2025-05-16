const express = require('express');
const router = express.Router();
const busesData = require('../data/buses.json');

router.get('/', (req, res) => {
  const { from, to, date } = req.query;
  if (!from || !to || !date) {
    return res.status(400).json({ msg: 'Missing query params: from, to, date' });
  }

  const filteredBuses = busesData.filter(bus =>
    bus.from.toLowerCase() === from.toLowerCase() &&
    bus.to.toLowerCase() === to.toLowerCase() &&
    bus.date === date
  );

  if (filteredBuses.length === 0) {
    return res.status(404).json({ msg: 'No buses found for the given criteria' });
  }

  res.json(filteredBuses);
});

module.exports = router;


const express = require('express');
const router = express.Router();
const trainsData = require('../data/trains.json');

router.get('/', (req, res) => {
  const { from, to, date } = req.query;
  if (!from || !to || !date) {
    return res.status(400).json({ msg: 'Missing query params: from, to, date' });
  }

  const filteredTrains = trainsData.filter(train =>
    train.from.toLowerCase() === from.toLowerCase() &&
    train.to.toLowerCase() === to.toLowerCase() &&
    train.date === date
  );

  if (filteredTrains.length === 0) {
    return res.status(404).json({ msg: 'No trains found for the given criteria' });
  }

  res.json(filteredTrains);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const hotelsData = require('../data/hotels.json');

router.get('/', (req, res) => {
  const { city, checkin, checkout } = req.query;

  if (!city || !checkin || !checkout) {
    return res.status(400).json({ msg: 'Missing query params: city, checkin, checkout' });
  }

  // Filter hotels in city and available for full date range
  const filteredHotels = hotelsData.filter(hotel => {
    if (hotel.city.toLowerCase() !== city.toLowerCase()) return false;

    // Check if all dates between checkin and checkout are in availabilityDates
    let currentDate = new Date(checkin);
    const endDate = new Date(checkout);

    while (currentDate < endDate) {
      const formattedDate = currentDate.toISOString().slice(0, 10);
      if (!hotel.availabilityDates.includes(formattedDate)) return false;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return true;
  });

  if (filteredHotels.length === 0) {
    return res.status(404).json({ msg: 'No hotels available for selected dates and city' });
  }

  res.json(filteredHotels);
});

module.exports = router;

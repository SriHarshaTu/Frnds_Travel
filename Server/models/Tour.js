const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  highlights: {
    type: [String],
    default: []
  },
  season: {
    type: String,
    required: true
  },
  tourCode: {  // ✅ New field for custom ID
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tour', TourSchema);
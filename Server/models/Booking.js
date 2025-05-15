const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  travelers: {
    type: Number,
    required: true,
    min: 1
  },
  travelDate: {
    type: Date,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'upi', 'wallet', 'paypal']
  },
  paymentStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'completed', 'failed', 'refunded']
  },
  transactionId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
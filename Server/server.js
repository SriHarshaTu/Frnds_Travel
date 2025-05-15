const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Serve static files from the Pages folder (your frontend)
app.use(express.static(path.join(__dirname, '../Pages')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api', require('./routes/bookings')); // ✅ Bookings route added

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Fallback route for any unmatched request (e.g., direct visits to /checkout.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Pages', 'Home.html'));
});

// Start Server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

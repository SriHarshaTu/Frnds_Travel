const mongoose = require('mongoose');
const Tour = require('./models/Tour');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const tours = [
  {
    state: "Goa",
    city: "Goa",
    name: "Goa Adventure",
    description: "Beaches, forts, nightlife and more!",
    basePrice: 15999,
    duration: "5D/4N",
    imageUrl: "/images/goa.jpg",
    highlights: ["Dudhsagar Falls", "Baga Beach", "Fort Aguada"],
    season: "Summer",
    tourCode: "GOA2025"  // ✅ This field is CRUCIAL!
  },
  {
    state: "Kerala",
    city: "Munnar",
    name: "Munnar Tea Estate Retreat",
    description: "A lush green escape with scenic tea plantations",
    basePrice: 13999,
    duration: "4D/3N",
    imageUrl: "/images/munnar.jpg",
    highlights: ["Tea Gardens", "Echo Point", "Mattupetty Dam"],
    season: "Monsoon",
    tourCode: "MUNNAR2025"
  },

  {
    state: "Himachal Pradesh",
    city: "Shimla",
    name: "Shimla Summer Special",
    description: "The queen of hill stations with colonial charm",
    basePrice: 8999,
    duration: "4D/3N",
    imageUrl: "/images/shimla.jpg",
    highlights: ["Mall Road", "Jakhu Temple", "Toy Train"],
    season: "Summer",
    tourCode: "SHIMLA2025"  // ✅ Another unique tour code
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(() => Tour.deleteMany({})) // Optional: Clear previous data
  .then(() => Tour.insertMany(tours))
  .then(() => {
    console.log('✅ Tours seeded successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error seeding tours:', err);
    process.exit(1);
  });

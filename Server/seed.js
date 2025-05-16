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
    state: "Kerala",
    city: "Wayanad",
    name: "Wayanad Nature Retreat",
    description: "A lush green paradise of waterfalls, caves, and hills.",
    basePrice: 10999,
    duration: "4D/3N",
    imageUrl: "/images/wayanad.jpg",
    highlights: ["Edakkal Caves", "Banasura Sagar Dam", "Soochipara Falls"],
    season: "Monsoon",
    tourCode: "WAYANAD2025"
  },

  {
    state: "Kerala",
    city: "Alleppey",
    name: "Alleppey Backwater Bliss",
    description: "Cruise the scenic backwaters and stay in a houseboat.",
    basePrice: 10999,
    duration: "3D/2N",
    imageUrl: "/images/alleppey.jpg",
    highlights: ["Houseboat Ride", "Vembanad Lake", "Alleppey Beach"],
    season: "Winter",
    tourCode: "ALLEPPEY2025"
  },

  {
    state: "Kerala",
    city: "Cochin",
    name: "Cochin Heritage Explorer",
    description: "A cultural escape with colonial charm and spice markets.",
    basePrice: 10999,
    duration: "3D/2N",
    imageUrl: "/images/cochin.jpg",
    highlights: ["Fort Kochi", "Chinese Fishing Nets", "Jew Town"],
    season: "Winter",
    tourCode: "COCHIN2025"
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
  },

  {
    state: "Himachal Pradesh",
    city: "Dalhousie",
    name: "Dalhousie Getaway",
    description: "Serene landscapes, pine-clad valleys, and peaceful charm",
    basePrice: 15999,
    duration: "5D/4N",
    imageUrl: "/images/dalhousie.jpg",
    highlights: ["Khajjiar", "St. John's Church", "Dainkund Peak"],
    season: "Summer",
    tourCode: "DALHOUSIE2025"
  },

  {
    state: "Himachal Pradesh",
    city: "Dharamshala",
    name: "Dharamshala Escape",
    description: "A peaceful hill retreat with Tibetan culture and mountain views",
    basePrice: 12999,
    duration: "4D/3N",
    imageUrl: "/images/dharamshala.jpg",
    highlights: ["McLeod Ganj", "Namgyal Monastery", "Bhagsu Waterfall"],
    season: "Summer",
    tourCode: "DHARMA2025"
  },

  {
    state: "Himachal Pradesh",
    city: "Kullu-Manali",
    name: "Kullu-Manali Snow Adventure",
    description: "Experience the snowy peaks and adventure sports of Himachal",
    basePrice: 19999,
    duration: "6D/5N",
    imageUrl: "/images/manali.jpg",
    highlights: ["Solang Valley", "Rohtang Pass", "Hadimba Temple"],
    season: "Winter",
    tourCode: "MANALI2025"
  },

  {
    state: "Meghalaya",
    city: "Shillong",
    name: "Shillong Nature Escape",
    description: "Experience the Scotland of the East with hills, lakes, and culture.",
    basePrice: 10999,
    duration: "4D/3N",
    imageUrl: "/images/shillong.jpg",
    highlights: ["Umiam Lake", "Elephant Falls", "Shillong Peak"],
    season: "Monsoon",
    tourCode: "SHILLONG2025"
  },

  {
    state: "Meghalaya",
    city: "Cherrapunji",
    name: "Cherrapunji Rain Trail",
    description: "Explore the wettest place on Earth with living root bridges.",
    basePrice: 10999,
    duration: "3D/2N",
    imageUrl: "/images/cherrapunji.jpg",
    highlights: ["Nohkalikai Falls", "Mawsmai Caves", "Living Root Bridges"],
    season: "Monsoon",
    tourCode: "CHERRAPUNJI2025"
  },

  {
    state: "Meghalaya",
    city: "Mawlynnong",
    name: "Mawlynnong Clean Village Tour",
    description: "Visit the cleanest village in Asia with stunning views.",
    basePrice: 10999,
    duration: "2D/1N",
    imageUrl: "/images/mawlynnong.jpg",
    highlights: ["Balancing Rock", "Sky Viewpoint", "Living Root Bridge"],
    season: "Summer",
    tourCode: "MAWLYNNONG2025"
  },

  {
    state: "Meghalaya",
    city: "Balpakram",
    name: "Balpakram Wilderness Trek",
    description: "Explore the biodiversity of Balpakram National Park.",
    basePrice: 10999,
    duration: "4D/3N",
    imageUrl: "/images/balpakram.jpg",
    highlights: ["Balpakram Plateau", "Wildlife Safari", "Siju Caves"],
    season: "Winter",
    tourCode: "BALPAKRAM2025"
  },

  {
    state: "Rajasthan",
    city: "Udaipur",
    name: "Udaipur Royal Retreat",
    description: "The City of Lakes with a royal touch.",
    basePrice: 19999,
    duration: "4D/3N",
    imageUrl: "/images/udaipur.jpg",
    highlights: ["City Palace", "Lake Pichola", "Bagore Ki Haveli"],
    season: "Winter",
    tourCode: "UDAIPUR2025"
  },
  {
    state: "Rajasthan",
    city: "Jaipur",
    name: "Jaipur Pink City Tour",
    description: "Explore the vibrant culture of Rajasthan's capital.",
    basePrice: 13999,
    duration: "4D/3N",
    imageUrl: "/images/jaipur.jpg",
    highlights: ["Hawa Mahal", "Amber Fort", "City Palace"],
    season: "Winter",
    tourCode: "JAIPUR2025"
  },
  {
    state: "Rajasthan",
    city: "Dausa",
    name: "Dausa Heritage Tour",
    description: "Offbeat Rajasthani town rich in history.",
    basePrice: 11999,
    duration: "3D/2N",
    imageUrl: "/images/dausa.jpg",
    highlights: ["Chand Baori", "Harshat Mata Temple"],
    season: "Winter",
    tourCode: "DAUSA2025"
  },
  {
    state: "Rajasthan",
    city: "Karauli",
    name: "Karauli Fort Escape",
    description: "A peaceful destination with historic forts.",
    basePrice: 12999,
    duration: "3D/2N",
    imageUrl: "/images/karauli.jpg",
    highlights: ["City Palace", "Timangarh Fort"],
    season: "Winter",
    tourCode: "KARAULI2025"
  },
  {
    state: "Uttar Pradesh",
    city: "Tajmahal",
    name: "Agra & Taj Mahal Trip",
    description: "Witness the wonder of the world – Taj Mahal.",
    basePrice: 12999,
    duration: "2D/1N",
    imageUrl: "/images/tajmahal.jpg",
    highlights: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
    season: "Winter",
    tourCode: "TAJMAHAL2025"
  },
  {
    state: "Uttar Pradesh",
    city: "Varanasi",
    name: "Varanasi Spiritual Journey",
    description: "The ancient city on the banks of Ganga.",
    basePrice: 12999,
    duration: "3D/2N",
    imageUrl: "/images/varanasi.jpg",
    highlights: ["Kashi Vishwanath", "Ganga Aarti", "Sarnath"],
    season: "Winter",
    tourCode: "VARANASI2025"
  },
  {
    state: "Uttar Pradesh",
    city: "Bareilly",
    name: "Bareilly Culture Tour",
    description: "A lively city famous for its cultural heritage.",
    basePrice: 13999,
    duration: "3D/2N",
    imageUrl: "/images/bareilly.jpg",
    highlights: ["Trivati Nath Temple", "Alakhnath Temple"],
    season: "Winter",
    tourCode: "BAREILLY2025"
  },
  {
    state: "Uttar Pradesh",
    city: "Aligarh",
    name: "Aligarh Fort Explorer",
    description: "Discover Aligarh’s historic landmarks.",
    basePrice: 9999,
    duration: "2D/1N",
    imageUrl: "/images/aligarh.jpg",
    highlights: ["Aligarh Fort", "AMU Campus"],
    season: "Winter",
    tourCode: "ALIGARH2025"
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

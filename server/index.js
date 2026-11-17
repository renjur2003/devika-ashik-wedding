const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors({
  origin: '*', // Allows requests from Vercel frontend or localhost
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Schema & Model for RSVPs
const rsvpSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true,
    trim: true,
  },
  attending: {
    type: String,
    enum: ['yes', 'remote'],
    default: 'yes',
  },
  guestCount: {
    type: Number,
    default: 1,
    min: 1,
    max: 20,
  },
  blessingMessage: {
    type: String,
    trim: true,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RSVP = mongoose.model('RSVP', rsvpSchema);

// Connect to MongoDB
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err.message));
} else {
  console.warn('⚠️ MONGODB_URI environment variable not set. Running in memory / mock mode.');
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Devika & Ashik Wedding API is running',
    timestamp: new Date().toISOString(),
    mongoConnected: mongoose.connection.readyState === 1,
  });
});

// Submit RSVP
app.post('/api/rsvp', async (req, res) => {
  try {
    const { guestName, attending, guestCount, blessingMessage } = req.body;

    if (!guestName || !guestName.trim()) {
      return res.status(400).json({ error: 'Guest name is required' });
    }

    const newRsvp = new RSVP({
      guestName: guestName.trim(),
      attending: attending || 'yes',
      guestCount: parseInt(guestCount, 10) || 1,
      blessingMessage: (blessingMessage || '').trim(),
    });

    const savedRsvp = await newRsvp.save();
    return res.status(201).json({
      success: true,
      message: 'RSVP received with love and recorded successfully!',
      rsvp: savedRsvp,
    });
  } catch (err) {
    console.error('Error saving RSVP:', err);
    return res.status(500).json({ error: 'Failed to record RSVP. Please try again or WhatsApp directly.' });
  }
});

// Get all RSVPs and summary statistics
app.get('/api/rsvps', async (req, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 });
    const totalAttendingGuests = rsvps
      .filter(r => r.attending === 'yes')
      .reduce((sum, r) => sum + (r.guestCount || 1), 0);

    return res.json({
      totalResponses: rsvps.length,
      attendingCount: rsvps.filter(r => r.attending === 'yes').length,
      totalGuests: totalAttendingGuests,
      rsvps,
    });
  } catch (err) {
    console.error('Error fetching RSVPs:', err);
    return res.status(500).json({ error: 'Failed to fetch RSVPs' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

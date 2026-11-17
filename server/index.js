const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Local JSON storage path (zero configuration needed)
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'rsvps.json');

// Ensure data folder and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Helper to read RSVPs
function getStoredRsvps() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw) || [];
  } catch (err) {
    return [];
  }
}

// Helper to save RSVPs
function saveStoredRsvps(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to rsvps.json:', err);
  }
}

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Optional MongoDB support if MONGODB_URI is provided
let mongoose = null;
let RSVPModel = null;
if (process.env.MONGODB_URI) {
  try {
    mongoose = require('mongoose');
    const rsvpSchema = new mongoose.Schema({
      guestName: { type: String, required: true },
      attending: { type: String, default: 'yes' },
      guestCount: { type: Number, default: 1 },
      blessingMessage: { type: String, default: '' },
      createdAt: { type: Date, default: Date.now }
    });
    RSVPModel = mongoose.model('RSVP', rsvpSchema);
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log('✅ Connected to MongoDB Atlas'))
      .catch((err) => console.warn('⚠️ MongoDB connection failed, using local storage:', err.message));
  } catch (err) {
    console.log('Running in standalone JSON file storage mode.');
  }
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Devika & Ashik Wedding API is live and healthy',
    timestamp: new Date().toISOString(),
    storage: RSVPModel && mongoose && mongoose.connection.readyState === 1 ? 'mongodb' : 'json-file',
  });
});

// Submit RSVP
app.post('/api/rsvp', async (req, res) => {
  try {
    const { guestName, attending, guestCount, blessingMessage } = req.body;

    if (!guestName || !guestName.trim()) {
      return res.status(400).json({ error: 'Guest name is required' });
    }

    const rsvpItem = {
      id: Date.now().toString(),
      guestName: guestName.trim(),
      attending: attending || 'yes',
      guestCount: parseInt(guestCount, 10) || 1,
      blessingMessage: (blessingMessage || '').trim(),
      createdAt: new Date().toISOString(),
    };

    // Save to MongoDB if available
    if (RSVPModel && mongoose && mongoose.connection.readyState === 1) {
      await new RSVPModel(rsvpItem).save();
    }

    // Always persist to local JSON file
    const existing = getStoredRsvps();
    existing.unshift(rsvpItem);
    saveStoredRsvps(existing);

    console.log(`💌 New RSVP recorded for: ${rsvpItem.guestName} (${rsvpItem.guestCount} guests)`);

    return res.status(201).json({
      success: true,
      message: 'RSVP received with love and recorded successfully!',
      rsvp: rsvpItem,
    });
  } catch (err) {
    console.error('Error saving RSVP:', err);
    return res.status(500).json({ error: 'Failed to record RSVP. Please try again or WhatsApp directly.' });
  }
});

// Get all RSVPs and summary statistics
app.get('/api/rsvps', async (req, res) => {
  try {
    let rsvps = [];
    if (RSVPModel && mongoose && mongoose.connection.readyState === 1) {
      rsvps = await RSVPModel.find().sort({ createdAt: -1 });
    } else {
      rsvps = getStoredRsvps();
    }

    const totalAttendingGuests = rsvps
      .filter((r) => r.attending === 'yes')
      .reduce((sum, r) => sum + (parseInt(r.guestCount, 10) || 1), 0);

    return res.json({
      totalResponses: rsvps.length,
      attendingResponses: rsvps.filter((r) => r.attending === 'yes').length,
      totalGuestsCount: totalAttendingGuests,
      rsvps,
    });
  } catch (err) {
    console.error('Error fetching RSVPs:', err);
    return res.status(500).json({ error: 'Failed to fetch RSVPs' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Devika & Ashik Wedding Server running on port ${PORT}`);
});

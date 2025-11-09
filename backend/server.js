const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB()
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Stop the server if DB connection fails
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const paletteRoutes = require('./routes/paletteRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/palettes', paletteRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Color Palette API is running' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

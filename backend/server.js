const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sanPhamRoutes = require('./routes/sanPhamRoutes');
const hoaDonRoutes = require('./routes/hoaDonRoutes');
const danhGiaRoutes = require('./routes/danhGiaRoutes');
const khuyenMaiRoutes = require('./routes/khuyenMaiRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/san-pham', sanPhamRoutes);
app.use('/api/hoa-don', hoaDonRoutes);
app.use('/api/danh-gia', danhGiaRoutes);
app.use('/api/khuyen-mai', khuyenMaiRoutes);

// Test Route
app.get('/', (req, res) => {
    res.json({ 
        message: '✅ Server is running!',
        version: '1.0.0',
        api: 'CDIO 3 E-Commerce Backend'
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        message: '❌ Route not found'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
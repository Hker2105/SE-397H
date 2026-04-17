const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

// Paths
const projectRoot = path.resolve(__dirname, '..');
const uploadsDir = path.join(projectRoot, 'uploads');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

// Serve frontend assets/pages so users can open full website on port 5000
app.use(express.static(projectRoot));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sanPhamRoutes = require('./routes/sanPhamRoutes');
const hoaDonRoutes = require('./routes/hoaDonRoutes');
const danhGiaRoutes = require('./routes/danhGiaRoutes');
const khuyenMaiRoutes = require('./routes/khuyenMaiRoutes');

// Use API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/san-pham', sanPhamRoutes);
app.use('/api/hoa-don', hoaDonRoutes);
app.use('/api/danh-gia', danhGiaRoutes);
app.use('/api/khuyen-mai', khuyenMaiRoutes);

// Root route now renders homepage instead of JSON
app.get('/', (req, res) => {
  res.sendFile(path.join(projectRoot, 'index.html'));
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API OK' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '❌ Route not found',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

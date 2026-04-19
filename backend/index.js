// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const path = require('path');

// dotenv.config();

// const app = express();

// // Paths
// const projectRoot = path.resolve(__dirname, '..');
// const uploadsDir = path.join(projectRoot, 'uploads');

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(uploadsDir));

// // Serve frontend assets/pages so users can open full website on port 5000
// app.use(express.static(projectRoot));

// // Import Routes
// const authRoutes = require('./routes/authRoutes');
// const khachHangRoutes = require('./routes/khachHangRoutes');
// const sanPhamRoutes = require('./routes/sanPhamRoutes');
// const donHangRoutes = require('./routes/donHangRoutes');
// const danhGiaRoutes = require('./routes/danhGiaRoutes');
// const voucherRoutes = require('./routes/voucherRoutes');

// // Use API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/khach-hang', khachHangRoutes);
// app.use('/api/san-pham', sanPhamRoutes);
// app.use('/api/don-hang', donHangRoutes);
// app.use('/api/danh-gia', danhGiaRoutes);
// app.use('/api/voucher', voucherRoutes);

// // Root route now renders homepage instead of JSON
// app.get('/', (req, res) => {
//   res.sendFile(path.join(projectRoot, 'index.html'));
// });

// app.get('/api/health', (req, res) => {
//   res.json({ success: true, message: 'API OK' });
// });

// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: '❌ Route not found',
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()


const app = express()
app.use(express.json())
express.urlencoded({extended: true})
import { AppRoute } from './AppRoute'

app.get('/', (req, res) => {

})

const port = process?.env?.PORT ?? 3000
AppRoute(app)
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})




























/**
npx sequelize-cli model:generate --name GIOHANG --attributes "" --force

run migrations: 
npx sequelize-cli db:migrate

npx sequelize-cli db:migrate:undo

SELECT * FROM information_schema.table_constraints
    -> WHERE table_schema = 'shop_laptop' AND table_name ='giohangs';
 */
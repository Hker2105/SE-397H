const express = require('express');
const khuyenMaiController = require('../controllers/khuyenMaiController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// GET /api/khuyen-mai - Lấy tất cả khuyến mãi (không cần login)
router.get('/', khuyenMaiController.getPromotions);

// GET /api/khuyen-mai/:id - Lấy khuyến mãi theo ID (không cần login)
router.get('/:id', khuyenMaiController.getPromotionById);

// POST /api/khuyen-mai - Tạo khuyến mãi (cần admin)
router.post('/', authMiddleware, khuyenMaiController.createPromotion);

// DELETE /api/khuyen-mai/:id - Xóa khuyến mãi (cần admin)
router.delete('/:id', authMiddleware, khuyenMaiController.deletePromotion);

module.exports = router;
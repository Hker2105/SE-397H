const express = require('express');
const voucherController = require('../controllers/voucherController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// GET /api/khuyen-mai - Lấy tất cả khuyến mãi (không cần login)
router.get('/', voucherController.getPromotions);

// GET /api/khuyen-mai/:id - Lấy khuyến mãi theo ID (không cần login)
router.get('/:id', voucherController.getPromotionById);

// POST /api/khuyen-mai - Tạo khuyến mãi (cần admin)
router.post('/', authMiddleware, voucherController.createPromotion);

// DELETE /api/khuyen-mai/:id - Xóa khuyến mãi (cần admin)
router.delete('/:id', authMiddleware, voucherController.deletePromotion);

module.exports = router;
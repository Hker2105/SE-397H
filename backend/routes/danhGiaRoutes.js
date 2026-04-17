const express = require('express');
const danhGiaController = require('../controllers/danhGiaController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/danh-gia - Thêm đánh giá (cần login)
router.post('/', authMiddleware, danhGiaController.createReview);

// GET /api/danh-gia/product/:productId - Lấy đánh giá của sản phẩm
router.get('/product/:productId', danhGiaController.getReviewsByProduct);

// GET /api/danh-gia/rating/:productId - Lấy rating trung bình
router.get('/rating/:productId', danhGiaController.getAverageRating);

// DELETE /api/danh-gia/:id - Xóa đánh giá (cần login)
router.delete('/:id', authMiddleware, danhGiaController.deleteReview);

module.exports = router;
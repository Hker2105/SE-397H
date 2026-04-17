const express = require('express');
const sanPhamController = require('../controllers/sanPhamController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

// GET /api/san-pham - Lấy tất cả sản phẩm (không cần login)
router.get('/', sanPhamController.getProducts);

// GET /api/san-pham/search - Tìm kiếm sản phẩm (không cần login)
router.get('/search', sanPhamController.searchProducts);

// GET /api/san-pham/:id - Lấy sản phẩm theo ID (không cần login)
router.get('/:id', sanPhamController.getProductById);

// POST /api/san-pham - Tạo sản phẩm (cần login + admin)
router.post('/', authMiddleware, upload.single('HinhAnh'), sanPhamController.createProduct);

// PUT /api/san-pham/:id - Cập nhật sản phẩm (cần login + admin)
router.put('/:id', authMiddleware, upload.single('HinhAnh'), sanPhamController.updateProduct);

// DELETE /api/san-pham/:id - Xóa sản phẩm (cần login + admin)
router.delete('/:id', authMiddleware, sanPhamController.deleteProduct);

module.exports = router;
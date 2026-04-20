// const express = require('express');
// const donHangController = require('../controllers/donHangController');
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();

// // GET /api/hoa-don/user/my-invoices - Lấy hóa đơn của user (cần login)
// router.get('/user/my-invoices', authMiddleware, donHangController.getUserInvoices);

// // GET /api/hoa-don/admin/all - Lấy tất cả hóa đơn (cần admin)
// router.get('/admin/all', authMiddleware, donHangController.getAllInvoices);

// // POST /api/hoa-don - Tạo hóa đơn mới (cần login)
// router.post('/', authMiddleware, donHangController.createInvoice);

// // GET /api/hoa-don/:id - Lấy hóa đơn theo ID (cần login)
// router.get('/:id', authMiddleware, donHangController.getInvoice);

// // PATCH /api/hoa-don/:id/status - Cập nhật trạng thái (cần admin)
// router.patch('/:id/status', authMiddleware, donHangController.updateInvoiceStatus);

// // POST /api/hoa-don/:id/items - Thêm sản phẩm vào hóa đơn (cần login)
// router.post('/:id/items', authMiddleware, donHangController.addItemToInvoice);

// // DELETE /api/hoa-don/:id/items/:productId - Xóa sản phẩm khỏi hóa đơn (cần login)
// router.delete('/:id/items/:productId', authMiddleware, donHangController.removeItemFromInvoice);

// module.exports = router;

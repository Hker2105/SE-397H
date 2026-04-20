// const express = require('express');
// const authController = require('../controllers/authController');
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();

// // POST /api/auth/register - Đăng ký
// router.post('/register', authController.register);

// // POST /api/auth/login - Đăng nhập
// router.post('/login', authController.login);

// // POST /api/auth/change-password - Đổi mật khẩu (cần login)
// router.post('/change-password', authMiddleware, authController.changePassword);

// module.exports = router;
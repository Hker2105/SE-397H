const express = require('express');
const khachHangController = require('../controllers/khachHangController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, khachHangController.getProfile);
router.put('/profile', authMiddleware, khachHangController.updateProfile);
router.get('/', authMiddleware, khachHangController.getAllUsers);
router.delete('/me', authMiddleware, khachHangController.deleteAccount);

module.exports = router;
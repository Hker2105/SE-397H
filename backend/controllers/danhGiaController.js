const DanhGia = require('../models/DanhGia');

// THÊM ĐÁNH GIÁ
exports.createReview = async (req, res) => {
    try {
        const TenDangNhap = req.user.TenDangNhap;
        const { MaSP, SoSao, NoiDung } = req.body;

        // Kiểm tra input
        if (!MaSP || !SoSao) {
            return res.status(400).json({ 
                success: false,
                message: 'Sản phẩm và số sao là bắt buộc' 
            });
        }

        // Kiểm tra số sao (1-5)
        if (SoSao < 1 || SoSao > 5) {
            return res.status(400).json({ 
                success: false,
                message: 'Số sao phải từ 1 đến 5' 
            });
        }

        const result = await DanhGia.create({
            MaSP: parseInt(MaSP),
            TenDangNhap,
            SoSao: parseInt(SoSao),
            NoiDung: NoiDung || ''
        });

        res.status(201).json({ 
            success: true,
            message: 'Thêm đánh giá thành công',
            data: {
                MaDG: result.insertId
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// LẤY ĐÁNH GIÁ CỦA SẢN PHẨM
exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const reviews = await DanhGia.getByProduct(productId, limit, offset);
        const rating = await DanhGia.getAverageRating(productId);

        res.json({ 
            success: true,
            page,
            limit,
            count: reviews.length,
            averageRating: rating?.avgRating || 0,
            totalReviews: rating?.totalReviews || 0,
            data: reviews 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// LẤY RATING TRUNG BÌNH
exports.getAverageRating = async (req, res) => {
    try {
        const { productId } = req.params;
        const rating = await DanhGia.getAverageRating(productId);

        res.json({ 
            success: true,
            data: rating || { avgRating: 0, totalReviews: 0 }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// XÓA ĐÁNH GIÁ
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        await DanhGia.delete(id);

        res.json({ 
            success: true,
            message: 'Xóa đánh giá thành công' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};
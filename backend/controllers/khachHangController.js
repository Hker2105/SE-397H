const TaiKhoan = require("../models/index").KHACHHANG;

// LẤY THÔNG TIN CÁ NHÂN
exports.getProfile = async (req, res) => {
    try {
        const TenDangNhap = req.user.TenDangNhap;
        const user = await TaiKhoan.findByUsername(TenDangNhap);

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'Tài khoản không tồn tại' 
            });
        }

        // Không trả về mật khẩu
        delete user.MatKhau;

        res.json({ 
            success: true,
            data: user 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// CẬP NHẬT THÔNG TIN CÁ NHÂN
exports.updateProfile = async (req, res) => {
    try {
        const TenDangNhap = req.user.TenDangNhap;
        const { HoTen, GioiTinh, SDT, DiaChi } = req.body;

        await TaiKhoan.update(TenDangNhap, {
            HoTen: HoTen || undefined,
            GioiTinh: GioiTinh !== undefined ? GioiTinh : undefined,
            SDT: SDT || undefined,
            DiaChi: DiaChi || undefined
        });

        res.json({ 
            success: true,
            message: 'Cập nhật thông tin thành công' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// LẤY DANH SÁCH NGƯỜI DÙNG (ADMIN)
exports.getAllUsers = async (req, res) => {
    try {
        // Kiểm tra có phải admin không
        if (req.user.MaLoai !== 1) {
            return res.status(403).json({ 
                success: false,
                message: 'Bạn không có quyền truy cập' 
            });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const users = await TaiKhoan.getAll(limit, offset);

        // Xóa mật khẩu
        users.forEach(user => delete user.MatKhau);

        res.json({ 
            success: true,
            page,
            limit,
            data: users 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// XÓA ACCOUNT
exports.deleteAccount = async (req, res) => {
    try {
        const TenDangNhap = req.user.TenDangNhap;

        await TaiKhoan.delete(TenDangNhap);

        res.json({ 
            success: true,
            message: 'Xóa tài khoản thành công' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TaiKhoan = require('../models/TaiKhoan');

// ĐĂNG KÝ
exports.register = async (req, res) => {
    try {
        const { TenDangNhap, MatKhau, HoTen, Email, SDT, DiaChi } = req.body;

        // Kiểm tra input
        if (!TenDangNhap || !MatKhau || !HoTen || !Email) {
            return res.status(400).json({ 
                success: false,
                message: 'Tên đăng nhập, mật khẩu, họ tên và email là bắt buộc' 
            });
        }

        // Kiểm tra username đã tồn tại
        const existingUser = await TaiKhoan.findByUsername(TenDangNhap);
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: 'Tên đăng nhập đã tồn tại' 
            });
        }

        // Kiểm tra email đã tồn tại
        const existingEmail = await TaiKhoan.findByEmail(Email);
        if (existingEmail) {
            return res.status(400).json({ 
                success: false,
                message: 'Email đã được đăng ký' 
            });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(MatKhau, salt);

        // Tạo tài khoản (mặc định là khách hàng - MaLoai = 2)
        await TaiKhoan.create({
            TenDangNhap,
            MatKhau: hashedPassword,
            HoTen,
            Email,
            SDT: SDT || null,
            DiaChi: DiaChi || null,
            MaLoai: 2 // Khách hàng
        });

        res.status(201).json({ 
            success: true,
            message: 'Đăng ký thành công. Vui lòng đăng nhập.' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// ĐĂNG NHẬP
exports.login = async (req, res) => {
    try {
        const { TenDangNhap, MatKhau } = req.body;

        // Kiểm tra input
        if (!TenDangNhap || !MatKhau) {
            return res.status(400).json({ 
                success: false,
                message: 'Tên đăng nhập và mật khẩu là bắt buộc' 
            });
        }

        // Tìm user
        const user = await TaiKhoan.findByUsername(TenDangNhap);
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không chính xác' 
            });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(MatKhau, user.MatKhau);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không chính xác' 
            });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { TenDangNhap: user.TenDangNhap, MaLoai: user.MaLoai },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ 
            success: true,
            message: 'Đăng nhập thành công',
            token,
            user: {
                TenDangNhap: user.TenDangNhap,
                HoTen: user.HoTen,
                Email: user.Email,
                MaLoai: user.MaLoai
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// ĐỔI MẬT KHẨU
exports.changePassword = async (req, res) => {
    try {
        const { MatKhauCu, MatKhauMoi } = req.body;
        const TenDangNhap = req.user.TenDangNhap;

        // Kiểm tra input
        if (!MatKhauCu || !MatKhauMoi) {
            return res.status(400).json({ 
                success: false,
                message: 'Mật khẩu cũ và mật khẩu mới là bắt buộc' 
            });
        }

        // Tìm user
        const user = await TaiKhoan.findByUsername(TenDangNhap);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'Tài khoản không tồn tại' 
            });
        }

        // Kiểm tra mật khẩu cũ
        const isPasswordValid = await bcrypt.compare(MatKhauCu, user.MatKhau);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Mật khẩu cũ không chính xác' 
            });
        }

        // Mã hóa mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(MatKhauMoi, salt);

        // Cập nhật mật khẩu
        await TaiKhoan.changePassword(TenDangNhap, hashedPassword);

        res.json({ 
            success: true,
            message: 'Đổi mật khẩu thành công' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};
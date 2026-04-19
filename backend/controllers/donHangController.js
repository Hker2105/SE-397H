const HoaDon = require('../models/HoaDon');
const ChiTietHoaDon = require('../models/ChiTietHoaDon');

// TẠO HÓA ĐƠN MỚI
exports.createInvoice = async (req, res) => {
    try {
        const TenDangNhap = req.user.TenDangNhap;
        const { SDT, DiaChi, HoTenNV, GhiChu } = req.body;

        // Kiểm tra input
        if (!DiaChi) {
            return res.status(400).json({ 
                success: false,
                message: 'Địa chỉ giao hàng là bắt buộc' 
            });
        }

        const result = await HoaDon.create({
            TenDangNhap,
            SDT: SDT || null,
            DiaChi,
            HoTenNV: HoTenNV || null,
            GhiChu: GhiChu || null
        });

        res.status(201).json({ 
            success: true,
            message: 'Tạo hóa đơn thành công',
            data: {
                MaHD: result.insertId
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// LẤY HÓA ĐƠN THEO ID
exports.getInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await HoaDon.getById(id);

        if (!invoice) {
            return res.status(404).json({ 
                success: false,
                message: 'Hóa đơn không tồn tại' 
            });
        }

        // Lấy chi tiết hóa đơn
        const details = await ChiTietHoaDon.getByInvoice(id);

        res.json({ 
            success: true,
            data: {
                ...invoice,
                items: details
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// LẤY HÓA ĐƠN CỦA NGƯỜI DÙNG
exports.getUserInvoices = async (req, res) => {
    try {
        const TenDangNhap = req.user.TenDangNhap;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const invoices = await HoaDon.getByUser(TenDangNhap, limit, offset);

        res.json({ 
            success: true,
            page,
            limit,
            count: invoices.length,
            data: invoices 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// LẤY TẤT CẢ HÓA ĐƠN (ADMIN)
exports.getAllInvoices = async (req, res) => {
    try {
        // Kiểm tra admin
        if (req.user.MaLoai !== 1) {
            return res.status(403).json({ 
                success: false,
                message: 'Chỉ admin mới có thể xem tất cả hóa đơn' 
            });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;

        const invoices = await HoaDon.getAll(limit, offset);

        res.json({ 
            success: true,
            page,
            limit,
            count: invoices.length,
            data: invoices 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// CẬP NHẬT TRẠNG THÁI HÓA ĐƠN (ADMIN)
exports.updateInvoiceStatus = async (req, res) => {
    try {
        // Kiểm tra admin
        if (req.user.MaLoai !== 1) {
            return res.status(403).json({ 
                success: false,
                message: 'Chỉ admin mới có thể cập nhật trạng thái' 
            });
        }

        const { id } = req.params;
        const { TrangThai } = req.body;

        // Kiểm tra trạng thái hợp lệ
        const validStatus = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
        if (!validStatus.includes(TrangThai)) {
            return res.status(400).json({ 
                success: false,
                message: 'Trạng thái không hợp lệ' 
            });
        }

        await HoaDon.updateStatus(id, TrangThai);

        res.json({ 
            success: true,
            message: 'Cập nhật trạng thái thành công' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// THÊM SẢN PHẨM VÀO HÓA ĐƠN
exports.addItemToInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { MaSP, TenKH, GiaGoc, TyLeKM, SoLuongMua } = req.body;

        // Kiểm tra input
        if (!MaSP || !GiaGoc || !SoLuongMua) {
            return res.status(400).json({ 
                success: false,
                message: 'Sản phẩm, giá và số lượng là bắt buộc' 
            });
        }

        await ChiTietHoaDon.addItem({
            MaHD: id,
            MaSP,
            TenKH: TenKH || 'Khách vãng lai',
            GiaGoc: parseFloat(GiaGoc),
            TyLeKM: parseFloat(TyLeKM) || 0,
            SoLuongMua: parseInt(SoLuongMua)
        });

        // Tính lại tổng tiền
        const details = await ChiTietHoaDon.getByInvoice(id);
        const TongTien = details.reduce((sum, item) => sum + item.ThanhTien, 0);
        
        await HoaDon.updateTotal(id, TongTien);

        res.status(201).json({ 
            success: true,
            message: 'Thêm sản phẩm vào hóa đơn thành công' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// XÓA SẢN PHẨM KHỎI HÓA ĐƠN
exports.removeItemFromInvoice = async (req, res) => {
    try {
        const { id, productId } = req.params;

        await ChiTietHoaDon.delete(id, productId);

        // Tính lại tổng tiền
        const details = await ChiTietHoaDon.getByInvoice(id);
        const TongTien = details.reduce((sum, item) => sum + item.ThanhTien, 0);
        
        await HoaDon.updateTotal(id, TongTien);

        res.json({ 
            success: true,
            message: 'Xóa sản phẩm khỏi hóa đơn thành công' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};
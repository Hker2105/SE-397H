const pool = require('../config/database');

class HoaDon {
    // Tạo hóa đơn mới
    static async create(data) {
        const { TenDangNhap, SDT, DiaChi, HoTenNV, GhiChu } = data;
        const query = `
            INSERT INTO hoa_don 
            (TenDangNhap, SDT, DiaChi, HoTenNV, GhiChu, TrangThai)
            VALUES (?, ?, ?, ?, ?, 'pending')
        `;
        try {
            const [result] = await pool.execute(query, [TenDangNhap, SDT, DiaChi, HoTenNV, GhiChu]);
            return result;
        } catch (error) {
            throw new Error(`Create invoice failed: ${error.message}`);
        }
    }

    // Lấy hóa đơn theo ID
    static async getById(MaHD) {
        const query = `
            SELECT hd.*, tk.HoTen, tk.Email
            FROM hoa_don hd
            LEFT JOIN tai_khoan tk ON hd.TenDangNhap = tk.TenDangNhap
            WHERE hd.MaHD = ?
        `;
        try {
            const [rows] = await pool.execute(query, [MaHD]);
            return rows[0];
        } catch (error) {
            throw new Error(`Get invoice failed: ${error.message}`);
        }
    }

    // Lấy hóa đơn của người dùng
    static async getByUser(TenDangNhap, limit = 10, offset = 0) {
        const query = `
            SELECT * FROM hoa_don 
            WHERE TenDangNhap = ?
            ORDER BY NgayHD DESC
            LIMIT ? OFFSET ?
        `;
        try {
            const [rows] = await pool.execute(query, [TenDangNhap, limit, offset]);
            return rows;
        } catch (error) {
            throw new Error(`Get invoices failed: ${error.message}`);
        }
    }

    // Lấy tất cả hóa đơn (admin)
    static async getAll(limit = 20, offset = 0) {
        const query = `
            SELECT hd.*, tk.HoTen
            FROM hoa_don hd
            LEFT JOIN tai_khoan tk ON hd.TenDangNhap = tk.TenDangNhap
            ORDER BY hd.NgayHD DESC
            LIMIT ? OFFSET ?
        `;
        try {
            const [rows] = await pool.execute(query, [limit, offset]);
            return rows;
        } catch (error) {
            throw new Error(`Get invoices failed: ${error.message}`);
        }
    }

    // Cập nhật trạng thái hóa đơn
    static async updateStatus(MaHD, TrangThai) {
        const query = 'UPDATE hoa_don SET TrangThai = ? WHERE MaHD = ?';
        try {
            const [result] = await pool.execute(query, [TrangThai, MaHD]);
            return result;
        } catch (error) {
            throw new Error(`Update status failed: ${error.message}`);
        }
    }

    // Cập nhật tổng tiền
    static async updateTotal(MaHD, TongTien) {
        const query = 'UPDATE hoa_don SET TongTien = ? WHERE MaHD = ?';
        try {
            const [result] = await pool.execute(query, [TongTien, MaHD]);
            return result;
        } catch (error) {
            throw new Error(`Update total failed: ${error.message}`);
        }
    }

    // Xóa hóa đơn
    static async delete(MaHD) {
        const query = 'DELETE FROM hoa_don WHERE MaHD = ?';
        try {
            const [result] = await pool.execute(query, [MaHD]);
            return result;
        } catch (error) {
            throw new Error(`Delete invoice failed: ${error.message}`);
        }
    }
}

module.exports = HoaDon;
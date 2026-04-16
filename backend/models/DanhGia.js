const pool = require('../config/database');

class DanhGia {
    // Thêm đánh giá
    static async create(data) {
        const { MaSP, TenDangNhap, SoSao, NoiDung } = data;
        const query = `
            INSERT INTO danhgia 
            (MaSP, TenDangNhap, SoSao, NoiDung, TrangThai)
            VALUES (?, ?, ?, ?, 1)
        `;
        try {
            const [result] = await pool.execute(query, [MaSP, TenDangNhap, SoSao, NoiDung]);
            return result;
        } catch (error) {
            throw new Error(`Create review failed: ${error.message}`);
        }
    }

    // Lấy đánh giá của sản phẩm
    static async getByProduct(MaSP, limit = 10, offset = 0) {
        const query = `
            SELECT dg.*, tk.HoTen
            FROM danhgia dg
            LEFT JOIN tai_khoan tk ON dg.TenDangNhap = tk.TenDangNhap
            WHERE dg.MaSP = ? AND dg.TrangThai = 1
            ORDER BY dg.NgayDG DESC
            LIMIT ? OFFSET ?
        `;
        try {
            const [rows] = await pool.execute(query, [MaSP, limit, offset]);
            return rows;
        } catch (error) {
            throw new Error(`Get reviews failed: ${error.message}`);
        }
    }

    // Tính rating trung bình
    static async getAverageRating(MaSP) {
        const query = `
            SELECT ROUND(AVG(SoSao), 1) as avgRating, COUNT(*) as totalReviews
            FROM danhgia
            WHERE MaSP = ? AND TrangThai = 1
        `;
        try {
            const [rows] = await pool.execute(query, [MaSP]);
            return rows[0];
        } catch (error) {
            throw new Error(`Get rating failed: ${error.message}`);
        }
    }

    // Xóa đánh giá (soft delete)
    static async delete(MaDG) {
        const query = 'UPDATE danhgia SET TrangThai = 0 WHERE MaDG = ?';
        try {
            const [result] = await pool.execute(query, [MaDG]);
            return result;
        } catch (error) {
            throw new Error(`Delete review failed: ${error.message}`);
        }
    }
}

module.exports = DanhGia;
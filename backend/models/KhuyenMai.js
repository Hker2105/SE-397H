const pool = require('../config/database');

class KhuyenMai {
    // Tạo khuyến mãi
    static async create(data) {
        const { TenKM, TuNgay, DenNgay, MucGiam, DonViGiam } = data;
        const query = `
            INSERT INTO khuyen_mai 
            (TenKM, TuNgay, DenNgay, MucGiam, DonViGiam, TrangThai)
            VALUES (?, ?, ?, ?, ?, 1)
        `;
        try {
            const [result] = await pool.execute(query, [TenKM, TuNgay, DenNgay, MucGiam, DonViGiam]);
            return result;
        } catch (error) {
            throw new Error(`Create promotion failed: ${error.message}`);
        }
    }

    // Lấy tất cả khuyến mãi
    static async getAll(limit = 20, offset = 0) {
        const query = `
            SELECT * FROM khuyen_mai 
            WHERE TrangThai = 1
            ORDER BY TuNgay DESC
            LIMIT ? OFFSET ?
        `;
        try {
            const [rows] = await pool.execute(query, [limit, offset]);
            return rows;
        } catch (error) {
            throw new Error(`Get promotions failed: ${error.message}`);
        }
    }

    // Lấy khuyến mãi theo ID
    static async getById(MaKM) {
        const query = 'SELECT * FROM khuyen_mai WHERE MaKM = ?';
        try {
            const [rows] = await pool.execute(query, [MaKM]);
            return rows[0];
        } catch (error) {
            throw new Error(`Get promotion failed: ${error.message}`);
        }
    }

    // Lấy sản phẩm trong khuyến mãi
    static async getProducts(MaKM) {
        const query = `
            SELECT sp.* FROM san_pham sp
            INNER JOIN ct_khuyen_mai ctk ON sp.MaSP = ctk.MaSP
            WHERE ctk.MaKM = ?
        `;
        try {
            const [rows] = await pool.execute(query, [MaKM]);
            return rows;
        } catch (error) {
            throw new Error(`Get promotion products failed: ${error.message}`);
        }
    }

    // Xóa khuyến mãi (soft delete)
    static async delete(MaKM) {
        const query = 'UPDATE khuyen_mai SET TrangThai = 0 WHERE MaKM = ?';
        try {
            const [result] = await pool.execute(query, [MaKM]);
            return result;
        } catch (error) {
            throw new Error(`Delete promotion failed: ${error.message}`);
        }
    }
}

module.exports = KhuyenMai;
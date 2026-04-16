const pool = require('../config/database');

class SanPham {
  static async create(data) {
    const { TenSP, DonGia, HinhAnh, MaDM, MaThue, MoTa } = data;
    const query = `
      INSERT INTO san_pham (TenSP, DonGia, HinhAnh, MaDM, MaThue, MoTa, TrangThai)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `;
    const [result] = await pool.execute(query, [TenSP, DonGia, HinhAnh, MaDM, MaThue, MoTa]);
    return result;
  }

  static async getAll(limit = 20, offset = 0) {
    const [rows] = await pool.execute(
      'SELECT * FROM san_pham WHERE TrangThai = 1 ORDER BY MaSP DESC LIMIT ? OFFSET ?',
      [limit, offset],
    );
    return rows;
  }

  static async getById(MaSP) {
    const [rows] = await pool.execute('SELECT * FROM san_pham WHERE MaSP = ? AND TrangThai = 1 LIMIT 1', [MaSP]);
    return rows[0] || null;
  }

  static async search(keyword, limit = 20, offset = 0) {
    const [rows] = await pool.execute(
      'SELECT * FROM san_pham WHERE TrangThai = 1 AND TenSP LIKE ? ORDER BY MaSP DESC LIMIT ? OFFSET ?',
      [`%${keyword}%`, limit, offset],
    );
    return rows;
  }

  static async update(MaSP, data) {
    const updates = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) return { affectedRows: 0 };

    values.push(MaSP);
    const [result] = await pool.execute(`UPDATE san_pham SET ${updates.join(', ')} WHERE MaSP = ?`, values);
    return result;
  }

  static async delete(MaSP) {
    const [result] = await pool.execute('UPDATE san_pham SET TrangThai = 0 WHERE MaSP = ?', [MaSP]);
    return result;
  }
}

module.exports = SanPham;

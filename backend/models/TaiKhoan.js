const pool = require('../config/database');

class TaiKhoan {
  static async findByUsername(TenDangNhap) {
    const [rows] = await pool.execute('SELECT * FROM tai_khoan WHERE TenDangNhap = ? LIMIT 1', [TenDangNhap]);
    return rows[0] || null;
  }

  static async findByEmail(Email) {
    const [rows] = await pool.execute('SELECT * FROM tai_khoan WHERE Email = ? LIMIT 1', [Email]);
    return rows[0] || null;
  }

  static async create(data) {
    const { TenDangNhap, MatKhau, HoTen, Email, SDT, DiaChi, MaLoai = 2 } = data;
    const query = `
      INSERT INTO tai_khoan (TenDangNhap, MatKhau, HoTen, Email, SDT, DiaChi, MaLoai)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [TenDangNhap, MatKhau, HoTen, Email, SDT, DiaChi, MaLoai]);
    return result;
  }

  static async changePassword(TenDangNhap, MatKhauMoi) {
    const [result] = await pool.execute('UPDATE tai_khoan SET MatKhau = ? WHERE TenDangNhap = ?', [MatKhauMoi, TenDangNhap]);
    return result;
  }

  static async update(TenDangNhap, data) {
    const updates = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) return { affectedRows: 0 };

    values.push(TenDangNhap);
    const [result] = await pool.execute(`UPDATE tai_khoan SET ${updates.join(', ')} WHERE TenDangNhap = ?`, values);
    return result;
  }

  static async getAll(limit = 10, offset = 0) {
    const [rows] = await pool.execute('SELECT * FROM tai_khoan ORDER BY TenDangNhap ASC LIMIT ? OFFSET ?', [limit, offset]);
    return rows;
  }

  static async delete(TenDangNhap) {
    const [result] = await pool.execute('DELETE FROM tai_khoan WHERE TenDangNhap = ?', [TenDangNhap]);
    return result;
  }
}

module.exports = TaiKhoan;

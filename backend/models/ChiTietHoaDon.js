const pool = require('../config/database');

class ChiTietHoaDon {
  static async addItem(data) {
    const { MaHD, MaSP, TenKH, GiaGoc, TyLeKM, SoLuongMua } = data;
    const query = `
      INSERT INTO ct_hoa_don (MaHD, MaSP, TenKH, GiaGoc, TyLeKM, SoLuongMua)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [MaHD, MaSP, TenKH, GiaGoc, TyLeKM, SoLuongMua]);
    return result;
  }

  static async getByInvoice(MaHD) {
    const query = `
      SELECT *, (GiaGoc * (1 - TyLeKM / 100) * SoLuongMua) AS ThanhTien
      FROM ct_hoa_don
      WHERE MaHD = ?
    `;
    const [rows] = await pool.execute(query, [MaHD]);
    return rows;
  }

  static async delete(MaHD, MaSP) {
    const [result] = await pool.execute('DELETE FROM ct_hoa_don WHERE MaHD = ? AND MaSP = ?', [MaHD, MaSP]);
    return result;
  }
}

module.exports = ChiTietHoaDon;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KHACHHANG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KHACHHANG.hasMany(models.GIOHANG, {
          foreignKey: 'MaKhachHang',
      });
      KHACHHANG.hasMany(models.DONHANG, {
          foreignKey: 'MaKhachHang',
      });
    }
  }
  KHACHHANG.init({
    HoTen: DataTypes.STRING,
    Email: DataTypes.STRING,
    MatKhau: DataTypes.STRING,
    SoDienThoai: DataTypes.STRING,
    DiaChi: DataTypes.STRING,
    LoaiTaiKhoan: DataTypes.STRING,
    NgayTao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'KHACHHANG',
    tableName: 'khachhangs',
  });
  return KHACHHANG;
};
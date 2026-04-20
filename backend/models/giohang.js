'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GIOHANG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GIOHANG.belongsTo(models.KHACHHANG,{
        foreignKey: 'MaKhachHang'
      })
      GIOHANG.belongsTo(models.SANPHAM,{
        foreignKey: 'MaSP'
      })
    }
  }
  GIOHANG.init({
    MaKhachHang: DataTypes.STRING,
    MaSP: DataTypes.STRING,
    NgayTao: DataTypes.DATE,
    SoLuong: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GIOHANG',
    tableName: 'giohangs',
  });
  return GIOHANG;
};
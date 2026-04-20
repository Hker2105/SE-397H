'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class THONGKE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      THONGKE.belongsTo(models.SANPHAM,{
        foreignKey: 'MaSP'
      })
    }
  }
  THONGKE.init({
    ThangNam: DataTypes.STRING,
    MaSP: DataTypes.STRING,
    TenSP: DataTypes.STRING,
    SoLuongBan: DataTypes.INTEGER,
    GiaBan: DataTypes.INTEGER,
    TongTienSP: DataTypes.INTEGER,
    DoanhThuThang: DataTypes.INTEGER,
    ChiPhiThang: DataTypes.INTEGER,
    LoiNhuanThang: DataTypes.INTEGER,
    NgayThongKe: DataTypes.DATE,
    GhiChu: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'THONGKE',
    tableName: 'thongkes',
  });
  return THONGKE;
};
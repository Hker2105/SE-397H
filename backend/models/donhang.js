'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DONHANG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DONHANG.belongsTo(models.KHACHHANG,{
        foreignKey: 'MaKhachHang'
      })
      DONHANG.belongsTo(models.VOUCHER,{
        foreignKey: 'MaVC'
      })
    }
  }
  DONHANG.init({
    MaDH: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    MaKhachHang: DataTypes.STRING,
    MaVC: DataTypes.STRING,
    SoLuong: DataTypes.INTEGER,
    DonGia: DataTypes.INTEGER,
    NgayDat: DataTypes.DATE,
    TongTien: DataTypes.INTEGER,
    TinhTrang: DataTypes.STRING,
    GhiChu: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'DONHANG',
    tableName: 'donhangs',
  });
  return DONHANG;
};
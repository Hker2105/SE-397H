'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class THUCUDOIMOI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      THUCUDOIMOI.belongsTo(models.KHACHHANG,{
        foreignKey: 'MaKhachHang'
      })
      THUCUDOIMOI.belongsTo(models.SANPHAM,{
        foreignKey: 'MaSP'
      })
    }
  }
  THUCUDOIMOI.init({
    MaKhachHang: DataTypes.STRING,
    TenSPCu: DataTypes.STRING,
    MoTaTinhTrang: DataTypes.TEXT,
    GiaDinhGia: DataTypes.INTEGER,
    MaSP: DataTypes.INTEGER,
    NgayGui: DataTypes.DATE,
    TrangThai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'THUCUDOIMOI',
    tableName: 'thucudoimois',
  });
  return THUCUDOIMOI;
};
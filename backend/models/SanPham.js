'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SANPHAM extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SANPHAM.belongsTo(models.DANHMUC,{
        foreignKey: 'MaDM'
      })
      SANPHAM.belongsTo(models.HANGSANXUAT,{
        foreignKey: 'MaHang'
      })
      SANPHAM.belongsTo(models.NHACUNGCAP,{
        foreignKey: 'MaNCC'
      })
      SANPHAM.hasMany(models.GIOHANG, {
          foreignKey: 'MaSP',
      });
    }
  }
  SANPHAM.init({
    MaSP: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    TenSP: DataTypes.STRING,
    MaDM: DataTypes.STRING,
    MaHang: DataTypes.STRING,
    MaNCC: DataTypes.STRING,
    MoTa: DataTypes.TEXT,
    Gia: DataTypes.INTEGER,
    SoLuongTon: DataTypes.INTEGER,
    HinhAnh: DataTypes.TEXT,
    UuDaiSV: DataTypes.BOOLEAN,
    NgayThem: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SANPHAM',
    tableName: 'sanphams',
  });
  return SANPHAM;
};
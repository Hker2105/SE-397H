'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DANHGIA extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DANHGIA.belongsTo(models.KHACHHANG,{
        foreignKey: 'MaKhachHang'
      })
      DANHGIA.belongsTo(models.SANPHAM,{
        foreignKey: 'MaSP'
      })
    }
  }
  DANHGIA.init({
    MaDG: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    MaKhachHang: DataTypes.STRING,
    MaSP: DataTypes.STRING,
    NoiDung: DataTypes.TEXT,
    Diem: DataTypes.INTEGER,
    NgayDG: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DANHGIA',
    tableName: 'danhgias',
  });
  return DANHGIA;
};
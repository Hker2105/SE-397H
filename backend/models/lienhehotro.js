'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LIENHEHOTRO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LIENHEHOTRO.belongsTo(models.KHACHHANG,{
        foreignKey: 'MaKhachHang'
      })
    }
  }
  LIENHEHOTRO.init({
    MaKhachHang: DataTypes.STRING,
    TieuDe: DataTypes.STRING,
    Noidung: DataTypes.TEXT,
    NgayGui: DataTypes.DATE,
    TrangThai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LIENHEHOTRO',
    tableName: 'lienhehotros',
  });
  return LIENHEHOTRO;
};
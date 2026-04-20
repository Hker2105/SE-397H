'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VOUCHER extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VOUCHER.hasMany(models.GIOHANG, {
          foreignKey: 'MaVC',
      });
    }
  }
  VOUCHER.init({
    MaVC: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    MaVoucher: DataTypes.STRING,
    GiaTri: DataTypes.INTEGER,
    NgayBD: DataTypes.DATE,
    NgayKT: DataTypes.DATE,
    SoLuong: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VOUCHER',
    tableName: 'vouchers',
  });
  return VOUCHER;
};
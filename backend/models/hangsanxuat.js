'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HANGSANXUAT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HANGSANXUAT.hasMany(models.SANPHAM, {
          foreignKey: 'MaHang',
      });
    }
  }
  HANGSANXUAT.init({
    TenHang: DataTypes.STRING,
    Mota: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HANGSANXUAT',
    tableName: 'hangsanxuats',
  });
  return HANGSANXUAT;
};
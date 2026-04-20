'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NHACUNGCAP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NHACUNGCAP.hasMany(models.SANPHAM, {
          foreignKey: 'MaNCC',
      });
    }
  }
  NHACUNGCAP.init({
    MaNCC: {
        primaryKey: true,
        type: DataTypes.STRING
      },
    TenNCC: DataTypes.STRING,
    SoDienThoai: DataTypes.STRING,
    DiaChi: DataTypes.STRING,
    Email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NHACUNGCAP',
    tableName: 'nhacungcaps',
  });
  return NHACUNGCAP;
};
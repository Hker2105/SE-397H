'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DANHMUC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DANHMUC.hasMany(models.SANPHAM, {
          foreignKey: 'MaDM',
      });
    }
  }
  DANHMUC.init({
    TenDanhMuc: DataTypes.STRING,
    MoTa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DANHMUC',
    tableName: 'danhmucs',
    underscored: false
  });
  return DANHMUC;
};
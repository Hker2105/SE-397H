'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class THANHTOAN extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      THANHTOAN.belongsTo(models.DONHANG,{
        foreignKey: 'MaDH'
      })
    }
  }
  THANHTOAN.init({
    MaTT: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    MaDH: DataTypes.STRING,
    HinhThuc: DataTypes.STRING,
    NgayThanhToan: DataTypes.DATE,
    TrangThai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'THANHTOAN',
    tableName: 'thanhtoans',
  });
  return THANHTOAN;
};
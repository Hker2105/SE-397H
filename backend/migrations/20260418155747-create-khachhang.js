'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('khachhangs', {
      MaKhachHang: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      HoTen: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING,
        unique: true 
      },
      MatKhau: {
        type: Sequelize.STRING
      },
      SoDienThoai: {
        type: Sequelize.STRING
      },
      DiaChi: {
        type: Sequelize.STRING
      },
      LoaiTaiKhoan: {
        type: Sequelize.STRING
      },
      NgayTao: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('khachhangs');
  }
};
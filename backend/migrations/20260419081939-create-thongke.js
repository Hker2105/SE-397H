'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('thongkes', {
      MaTK: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      ThangNam: {
        type: Sequelize.STRING
      },
      MaSP: {
        type: Sequelize.STRING,
        references: {
          model: 'sanphams',
          key: 'MaSP',
        },
      },
      TenSP: {
        type: Sequelize.STRING
      },
      SoLuongBan: {
        type: Sequelize.INTEGER
      },
      GiaBan: {
        type: Sequelize.INTEGER
      },
      TongTienSP: {
        type: Sequelize.INTEGER
      },
      DoanhThuThang: {
        type: Sequelize.INTEGER
      },
      ChiPhiThang: {
        type: Sequelize.INTEGER
      },
      LoiNhuanThang: {
        type: Sequelize.INTEGER
      },
      NgayThongKe: {
        type: Sequelize.DATE
      },
      GhiChu: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('thongkes');
  }
};
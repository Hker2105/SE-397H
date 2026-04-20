'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lienhehotros', {
      MaLH: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      MaKhachHang: {
        type: Sequelize.STRING,
        references: {
          model: 'khachhangs',
          key: 'MaKhachHang',
        },
      },
      TieuDe: {
        type: Sequelize.STRING
      },
      Noidung: {
        type: Sequelize.TEXT
      },
      NgayGui: {
        type: Sequelize.DATE
      },
      TrangThai: {
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
    await queryInterface.dropTable('lienhehotros');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('danhgias', {
      MaDG: {
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
      MaSP: {
        type: Sequelize.STRING,
        references: {
          model: 'sanphams',
          key: 'MaSP',
        },
      },
      NoiDung: {
        type: Sequelize.TEXT
      },
      Diem: {
        type: Sequelize.INTEGER
      },
      NgayDG: {
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
    await queryInterface.dropTable('danhgias');
  }
};
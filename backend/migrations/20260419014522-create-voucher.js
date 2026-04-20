'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vouchers', {
      MaVC: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      MaVoucher: {
        type: Sequelize.STRING
      },
      GiaTri: {
        type: Sequelize.INTEGER
      },
      NgayBD: {
        type: Sequelize.DATE
      },
      NgayKT: {
        type: Sequelize.DATE
      },
      SoLuong: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('vouchers');
  }
};
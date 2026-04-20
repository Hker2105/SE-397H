'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('thanhtoans', {
      MaTT: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      MaDH: {
        type: Sequelize.STRING,
        references: {
          model: 'donhangs',
          key: 'MaDH',
        },
      },
      HinhThuc: {
        type: Sequelize.STRING
      },
      NgayThanhToan: {
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
    await queryInterface.dropTable('thanhtoans');
  }
};
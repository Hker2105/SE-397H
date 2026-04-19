'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('thanhtoans', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      MaDH: {
        type: Sequelize.STRING,
        references: {
          model: 'donhangs',
          key: 'id',
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
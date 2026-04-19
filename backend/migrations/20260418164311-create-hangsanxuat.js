'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hangsanxuats', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      TenHang: {
        type: Sequelize.STRING
      },
      Mota: {
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
    await queryInterface.dropTable('hangsanxuats');
  }
};
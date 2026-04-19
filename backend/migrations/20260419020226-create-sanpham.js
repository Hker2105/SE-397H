'use strict';

const { Model } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sanphams', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      TenSP: {
        type: Sequelize.STRING
      },
      MaDM: {
        type: Sequelize.STRING,
        references: {
          model: 'danhmucs',
          key: 'id',
        },
      },
      MaHang: {
        type: Sequelize.STRING,
        references: {
          model: 'hangsanxuats',
          key: 'id',
        },
      },
      MaNCC: {
        type: Sequelize.STRING,
        references: {
          model: 'nhacungcaps',
          key: 'id',
        },
      },
      MoTa: {
        type: Sequelize.TEXT
      },
      Gia: {
        type: Sequelize.INTEGER
      },
      SoLuongTon: {
        type: Sequelize.INTEGER
      },
      HinhAnh: {
        type: Sequelize.TEXT
      },
      UuDaiSV: {
        type: Sequelize.BOOLEAN
      },
      NgayThem: {
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
    await queryInterface.dropTable('sanphams');
  }
};
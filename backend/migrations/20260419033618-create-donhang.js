'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('donhangs', {
      MaDH: {
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
      MaVC: {
        type: Sequelize.STRING,
        references: {
          model: 'vouchers',
          key: 'MaVC',
        },
      },
      SoLuong: {
        type: Sequelize.INTEGER
      },
      DonGia: {
        type: Sequelize.INTEGER
      },
      NgayDat: {
        type: Sequelize.DATE
      },
      TongTien: {
        type: Sequelize.INTEGER
      },
      TinhTrang: {
        type: Sequelize.STRING
      },
      GhiChu: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('donhangs');
  }
};
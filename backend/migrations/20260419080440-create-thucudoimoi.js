'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('thucudoimois', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      MaKhachHang: {
        type: Sequelize.STRING,
        references: {
          model: 'khachhangs',
          key: 'id',
        },
      },
      TenSPCu: {
        type: Sequelize.STRING
      },
      MoTaTinhTrang: {
        type: Sequelize.TEXT
      },
      GiaDinhGia: {
        type: Sequelize.INTEGER
      },
      MaSP: {
        type: Sequelize.STRING,
        references: {
          model: 'sanphams',
          key: 'id',
        },
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
    await queryInterface.dropTable('thucudoimois');
  }
};
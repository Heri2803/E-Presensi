'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PengaturanPresensi', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      start_time: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '07:00'
      },
      end_time: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '09:00'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('PengaturanPresensi');
  }
};

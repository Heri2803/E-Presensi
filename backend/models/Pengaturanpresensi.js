const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PengaturanPresensi = sequelize.define('PengaturanPresensi', {
  start_time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  end_time: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'pengaturan_presensi',
  timestamps: true
});

module.exports = PengaturanPresensi;

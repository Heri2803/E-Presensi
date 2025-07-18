const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Presensi = sequelize.define('Presensi', {
    presensi_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tanggal: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('hadir', 'izin', 'sakit', 'alpha'),
        allowNull: false
    },
    lokasi: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'presensi',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Presensi;

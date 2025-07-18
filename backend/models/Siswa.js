const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Siswa = sequelize.define('Siswa', {
    siswa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    kelas: {
        type: DataTypes.STRING,
        allowNull: true
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    no_hp: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'siswa',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Siswa;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Guru = sequelize.define('Guru', {
    guru_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mapel: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'guru',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Guru;

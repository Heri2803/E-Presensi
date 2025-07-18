const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nama database
    process.env.DB_USER,      // User MySQL
    process.env.DB_PASSWORD,  // Password MySQL
    {
        host: process.env.DB_HOST, // Host
        dialect: 'mysql'           // Database type
    }
);

// Cek koneksi
sequelize.authenticate()
    .then(() => console.log('Database connected via Sequelize'))
    .catch(err => console.error('Connection error:', err));

module.exports = sequelize;

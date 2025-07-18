const sequelize = require('../config/db');
const Sequelize = require('sequelize');

const User = require('./User');
const Siswa = require('./Siswa');
const Guru = require('./Guru');
const Presensi = require('./Presensi');
const PengaturanPresensi = require('./Pengaturanpresensi');

const db = {
  sequelize,
  Sequelize,
  User,
  Siswa,
  Guru,
  Presensi,
  PengaturanPresensi
};

// Relasi
User.hasOne(Siswa, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Siswa.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Guru, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Guru.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Presensi, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Presensi.belongsTo(User, { foreignKey: 'user_id' });

module.exports = db;

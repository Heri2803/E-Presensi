const express = require('express');
const sequelize = require('./config/db');
const { User, Siswa, Guru, Presensi } = require('./models');
const authRoutes = require('./routes/authRoutes');
const presensiRoutes = require('./routes/presensiRoutes');
const { swaggerUi, swaggerSpec } = require('./swagger');
require('dotenv').config();

const app = express();
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', presensiRoutes);

// Tes koneksi
sequelize.authenticate()
    .then(() => console.log('✅ Koneksi Sequelize berhasil'))
    .catch(err => console.error('❌ Gagal koneksi:', err));

sequelize.sync({ alter: false })
    .then(() => console.log('✅ Database synchronized'))
    .catch(err => console.error('❌ Sync error:', err));

app.get('/', (req, res) => {
    res.send('API ePresensi berjalan...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di http://192.168.193.51:${PORT}/api-docs`));

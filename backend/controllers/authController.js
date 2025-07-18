const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Siswa, Guru } = require('../models');

// Register User (Siswa atau Guru)
exports.register = async (req, res) => {
    try {
        const { nis_or_nip, name, password, role, kelas, alamat, no_hp, mapel } = req.body;

        // Cek apakah user sudah ada
        const existingUser = await User.findOne({ where: { nis_or_nip } });
        if (existingUser) return res.status(400).json({ message: 'User sudah terdaftar' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan ke tabel users
        const newUser = await User.create({
            nis_or_nip,
            name,
            password: hashedPassword,
            role
        });

        // Simpan detail siswa/guru
        if (role === 'siswa') {
            await Siswa.create({
                user_id: newUser.user_id,
                kelas,
                alamat,
                no_hp
            });
        } else if (role === 'guru') {
            await Guru.create({
                user_id: newUser.user_id,
                mapel,
                no_hp
            });
        }

        res.status(201).json({ message: 'Registrasi berhasil', user: { nis_or_nip, name, role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { nis_or_nip, password } = req.body;

        // Cari user
        const user = await User.findOne({ where: { nis_or_nip } });
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Password salah' });

        // Generate JWT
        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '1d' }
        );

        res.json({ message: 'Login berhasil', token, role: user.role, name: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
    }
};
